��# #   C I / C D 
 
 
 
 C e   p r o j e t   u t i l i s e   G i t H u b   A c t i o n s   p o u r   l ' i n t � g r a t i o n   c o n t i n u e   e t   l e   d � p l o i e m e n t   c o n t i n u . 
 
 
 
 # # #   W o r k f l o w s 
 
 
 
 -   * * C I / C D   P i p e l i n e * * :   E x � c u t �   �   c h a q u e   p u s h   s u r   l a   b r a n c h e   m a i n   e t   �   c h a q u e   p u l l   r e q u e s t .   I l   v � r i f i e   l e   l i n t i n g ,   e x � c u t e   l e s   t e s t s   e t   c o n s t r u i t   l e   p r o j e t . 
 
 -   * * P u l l   R e q u e s t   C h e c k s * * :   E x � c u t �   �   c h a q u e   p u l l   r e q u e s t .   I l   v � r i f i e   l e s   t y p e s ,   e x � c u t e   l e s   t e s t s   e t   c o m m e n t e   l a   P R   a v e c   l e s   r � s u l t a t s . 
 
 -   * * D e p l o y   t o   V e r c e l * * :   E x � c u t �   �   c h a q u e   p u s h   s u r   l a   b r a n c h e   m a i n .   I l   d � p l o i e   l ' a p p l i c a t i o n   s u r   V e r c e l   a p r � s   a v o i r   e x � c u t �   l e s   t e s t s . 
 
 
 
 # # #   B a d g e s 
 
 
 
 [ ! [ C I / C D   P i p e l i n e ] ( h t t p s : / / g i t h u b . c o m / s e b s c h o p f / p o k e d e x - l a n g a g e / a c t i o n s / w o r k f l o w s / c i . y m l / b a d g e . s v g ) ] ( h t t p s : / / g i t h u b . c o m / s e b s c h o p f / p o k e d e x - l a n g a g e / a c t i o n s / w o r k f l o w s / c i . y m l ) 
 
 [ ! [ c o d e c o v ] ( h t t p s : / / c o d e c o v . i o / g h / s e b s c h o p f / p o k e d e x - l a n g a g e / b r a n c h / m a i n / g r a p h / b a d g e . s v g ) ] ( h t t p s : / / c o d e c o v . i o / g h / s e b s c h o p f / p o k e d e x - l a n g a g e ) 
 
 
 
 # # #   H o o k s   G i t 
 
 
 
 C e   p r o j e t   u t i l i s e   H u s k y   p o u r   e x � c u t e r   d e s   h o o k s   G i t : 
 
 
 
 -   * * p r e - c o m m i t * * :   E x � c u t e   l i n t - s t a g e d   p o u r   v � r i f i e r   e t   f o r m a t e r   l e   c o d e   a v a n t   d e   l e   c o m m i t t e r . 
 
 -   * * p r e - p u s h * * :   E x � c u t e   l e s   t e s t s   a v a n t   d e   p o u s s e r   l e s   c h a n g e m e n t s . 
 
 
 
 P o u r   i n s t a l l e r   l e s   h o o k s ,   e x � c u t e z : 
 
 
 
 \ ` \ ` \ ` b a s h 
 
 n p m   r u n   p r e p a r e 
 
 
