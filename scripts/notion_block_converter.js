/**
 * Signal Resolution — Notion Block to Eleventy Markdown Converter
 * Runs in n8n as a Code node after Notion API page fetch
 * Input: Notion page properties + blocks array
 * Output: { frontmatter: string, body: string, markdown: string, slug: string }
 */

function convertNotionToMarkdown(notionPage, blocks) {
  const props = notionPage.properties;

  // Extract properties from Notion page
  const title = props.Title?.title?.[0]?.plain_text || '';
  const description = props['Meta Description']?.rich_text?.[0]?.plain_text || '';
  const date = props['Publish Date']?.date?.start || new Date().toISOString().split('T')[0];
  const buyerState = props['Buyer State']?.select?.name?.toLowerCase().replace(' ', '_') || '';
  const tier = props.Tier?.select?.name || 'A';
  const contentType = props['Content Type']?.select?.name?.toLowerCase() || 'standard';
  const ctaType = props['CTA Type']?.select?.name?.toLowerCase() || 'diagnostic';
  const slug = props.Slug?.rich_text?.[0]?.plain_text || slugify(title);
  const primaryKeyword = props['Primary Keyword']?.rich_text?.[0]?.plain_text || '';
  const readTime = props['Read Time']?.rich_text?.[0]?.plain_text || '5 min';

  // Build YAML frontmatter
  const frontmatter = `---
layout: post
title: "${title.replace(/"/g, '\\"')}"
description: "${description.replace(/"/g, '\\"')}"
date: ${date}
category: "${buyerState}"
buyer_state: "${buyerState}"
tier: "${tier}"
content_type: "${contentType}"
featured: false
permalink: /blog/${slug}/
readTime: "${readTime}"
cta_type: "${ctaType}"
canonical_url: "https://signalresolution.com/blog/${slug}/"
og_image: "/assets/og/default.svg"
---`;

  // Convert blocks to markdown
  const body = blocks.map(block => convertBlock(block)).filter(Boolean).join('\n\n');

  return {
    frontmatter,
    body,
    markdown: `${frontmatter}\n\n${body}`,
    slug,
    filename: `${slug}.md`
  };
}

function convertBlock(block) {
  const type = block.type;
  const content = block[type];

  switch (type) {
    case 'paragraph':
      return richTextToMarkdown(content.rich_text);

    case 'heading_1':
      return `# ${richTextToMarkdown(content.rich_text)}`;

    case 'heading_2':
      return `## ${richTextToMarkdown(content.rich_text)}`;

    case 'heading_3':
      return `### ${richTextToMarkdown(content.rich_text)}`;

    case 'bulleted_list_item':
      return `- ${richTextToMarkdown(content.rich_text)}`;

    case 'numbered_list_item':
      return `1. ${richTextToMarkdown(content.rich_text)}`;

    case 'quote':
      return `> ${richTextToMarkdown(content.rich_text)}`;

    case 'code':
      return `\`\`\`${content.language || ''}\n${richTextToMarkdown(content.rich_text)}\n\`\`\``;

    case 'divider':
      return '---';

    case 'callout':
      return `> **${richTextToMarkdown(content.rich_text)}**`;

    case 'toggle':
      return richTextToMarkdown(content.rich_text);

    default:
      return '';
  }
}

function richTextToMarkdown(richText) {
  if (!richText || richText.length === 0) return '';
  return richText.map(text => {
    let content = text.plain_text || '';
    if (text.annotations?.bold) content = `**${content}**`;
    if (text.annotations?.italic) content = `*${content}*`;
    if (text.annotations?.code) content = `\`${content}\``;
    if (text.href) content = `[${content}](${text.href})`;
    return content;
  }).join('');
}

function slugify(text) {
  return text.toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// n8n Code node export
const page = $input.first().json;
const blocks = $input.all().slice(1).map(item => item.json);
return { json: convertNotionToMarkdown(page, blocks) };
