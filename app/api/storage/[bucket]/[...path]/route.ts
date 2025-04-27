import { type NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

/**
 * Route API pour accéder aux fichiers stockés dans Supabase Storage
 * @param request La requête HTTP
 * @param params Les paramètres de la route (bucket et chemin du fichier)
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { bucket: string; path: string[] } },
) {
  const { bucket, path } = params;
  const filePath = path.join('/');

  try {
    const supabase = createServerClient();

    // Vérifier si le bucket existe
    const { data: buckets, error: bucketsError } = await supabase.storage.listBuckets();

    if (bucketsError) {
      console.error('Erreur lors de la récupération des buckets:', bucketsError);
      return NextResponse.json(
        { error: 'Erreur lors de la récupération des buckets', details: bucketsError.message },
        { status: 500 },
      );
    }

    const bucketExists = buckets.some(b => b.name === bucket);
    if (!bucketExists) {
      return NextResponse.json({ error: `Le bucket '${bucket}' n'existe pas` }, { status: 404 });
    }

    // Télécharger le fichier
    const { data, error } = await supabase.storage.from(bucket).download(filePath);

    if (error) {
      console.error('Erreur lors du téléchargement du fichier:', error);
      return NextResponse.json(
        { error: `Fichier non trouvé: ${filePath}`, details: error.message },
        { status: 404 },
      );
    }

    // Déterminer le type MIME
    const contentType = getContentType(filePath);

    // Créer une réponse avec le fichier
    return new NextResponse(data, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (error) {
    console.error('Erreur lors de la récupération du fichier:', error);
    return NextResponse.json(
      {
        error: 'Erreur lors de la récupération du fichier',
        message: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    );
  }
}

/**
 * Fonction pour déterminer le type MIME en fonction de l'extension du fichier
 * @param filePath Chemin du fichier
 * @returns Type MIME correspondant à l'extension du fichier
 */
function getContentType(filePath: string): string {
  const extension = filePath.split('.').pop()?.toLowerCase() || '';

  const mimeTypes: Record<string, string> = {
    png: 'image/png',
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    gif: 'image/gif',
    webp: 'image/webp',
    svg: 'image/svg+xml',
    pdf: 'application/pdf',
    json: 'application/json',
    txt: 'text/plain',
    html: 'text/html',
    css: 'text/css',
    js: 'application/javascript',
    // Ajout de types supplémentaires
    mp3: 'audio/mpeg',
    mp4: 'video/mp4',
    webm: 'video/webm',
    glb: 'model/gltf-binary',
    gltf: 'model/gltf+json',
  };

  return mimeTypes[extension] || 'application/octet-stream';
}
