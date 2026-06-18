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
  return html.replace(pattern, '<p class="ver">$1<span class="ver-ref">$2</span></p>');
}
