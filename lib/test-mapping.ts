import { createClient } from "@supabase/supabase-js";
import { dbToLibrary, dbToLanguage } from "./database-mapping";

export async function testDatabaseMapping() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY as string;

  const supabase = createClient(supabaseUrl, supabaseKey);

  // Test pour Library
  const { data: libraryData, error: libraryError } = await supabase
    .from('libraries')
    .select('*')
    .limit(1)
    .single();
    
  if (libraryError) {
    console.error('Erreur lors de la récupération de la bibliothèque:', libraryError);
  } else {
    const library = dbToLibrary(libraryData);
    console.log('Données brutes de la bibliothèque:', libraryData);
    console.log('Bibliothèque convertie:', library);
    
    // Vérifier que les propriétés importantes sont correctement mappées
    console.log('Vérification du mapping de la bibliothèque:');
    console.log('- ID:', library.id === libraryData.id ? '✅' : '❌');
    console.log('- Nom:', library.name === libraryData.name ? '✅' : '❌');
    console.log('- Language ID:', library.languageId === libraryData.language_id ? '✅' : '❌');
  }

  // Test pour Language
  const { data: languageData, error: languageError } = await supabase
    .from('languages')
    .select('*')
    .limit(1)
    .single();
    
  if (languageError) {
    console.error('Erreur lors de la récupération du langage:', languageError);
  } else {
    const language = dbToLanguage(languageData);
    console.log('Données brutes du langage:', languageData);
    console.log('Langage converti:', language);
    
    // Vérifier que les propriétés importantes sont correctement mappées
    console.log('Vérification du mapping du langage:');
    console.log('- ID:', language.id === languageData.id ? '✅' : '❌');
    console.log('- Nom:', language.name === languageData.name ? '✅' : '❌');
    console.log('- Slug:', language.slug === languageData.slug ? '✅' : '❌');
  }

  return {
    library: libraryData ? { raw: libraryData, converted: dbToLibrary(libraryData) } : null,
    language: languageData ? { raw: languageData, converted: dbToLanguage(languageData) } : null
  };
}