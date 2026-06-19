/**
 * Utility for HTML transformation
 * Contains functions to manipulate and format HTML content
 */

/**
 * Transform verse references inline
 * Converts structure: <p class="ver">text</p><p class="ver-rif">reference</p>
 * Into: <p class="ver">text<span class="ver-ref">reference</span></p>
 */
export function inlineVerseReferences(html: string): string {
  const pattern = /<p class="ver">([\s\S]*?)<\/p>\s*<p class="ver-rif">([\s\S]*?)<\/p>/g;
  const withInlineReferences = html.replace(
    pattern,
    '<p class="ver">$1<span class="ver-ref">$2</span></p>',
  );

  // The contact page is temporarily unavailable, so remove the footer navigation CTA from home content.
  return withInlineReferences.replace(
    /<div class="w-full footer-nav-wrap">[\s\S]*?<\/div>/g,
    '',
  );
}
