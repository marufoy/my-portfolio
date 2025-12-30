import { createClient } from 'microcms-js-sdk';

// MicroCMSのクライアントを作成
export const client = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN || '',
  apiKey: process.env.MICROCMS_API_KEY || '',
});

// Work型の定義
export interface Work {
  id: string;
  title: string;
  description: string;
  image: string;
  slug: string;
  content?: string; // 詳細ページ用のコンテンツ
  technologies?: string[]; // 使用技術
  period?: string; // 開発期間
  url?: string; // プロジェクトURL
  github?: string; // GitHub URL
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

// すべてのWorksを取得
export async function getAllWorks(): Promise<Work[]> {
  try {
    const data = await client.get({
      endpoint: 'works',
      queries: {
        fields: 'id,title,description,image,slug,createdAt,updatedAt,publishedAt',
        orders: '-publishedAt',
      },
    });
    return data.contents as Work[];
  } catch (error) {
    console.error('Error fetching works:', error);
    return [];
  }
}

// スラッグから特定のWorkを取得
export async function getWorkBySlug(slug: string): Promise<Work | null> {
  try {
    const data = await client.get({
      endpoint: 'works',
      queries: {
        filters: `slug[equals]${slug}`,
        fields: 'id,title,description,image,slug,content,technologies,period,url,github,createdAt,updatedAt,publishedAt',
      },
    });
    
    if (data.contents && data.contents.length > 0) {
      return data.contents[0] as Work;
    }
    return null;
  } catch (error) {
    console.error('Error fetching work by slug:', error);
    return null;
  }
}

// すべてのスラッグを取得（静的生成用）
export async function getAllSlugs(): Promise<string[]> {
  try {
    const data = await client.get({
      endpoint: 'works',
      queries: {
        fields: 'slug',
      },
    });
    return data.contents.map((item: { slug: string }) => item.slug);
  } catch (error) {
    console.error('Error fetching slugs:', error);
    return [];
  }
}

