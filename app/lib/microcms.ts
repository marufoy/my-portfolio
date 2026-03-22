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
  subtitle?: string; // サブタイトル
  description: string;
  image: string | { url: string; width?: number; height?: number }; // MicroCMSの画像フィールド
  slug: string;
  content?: string; // 詳細ページ用のコンテンツ（HTML形式）
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
        fields: 'id,title,subtitle,description,image,slug,createdAt,updatedAt,publishedAt',
        orders: '-publishedAt',
      },
    });
    // 画像フィールドを文字列に変換
    const works = data.contents.map((work: any) => ({
      ...work,
      image: typeof work.image === 'object' ? work.image.url : work.image,
    }));
    return works as Work[];
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
      const work = data.contents[0];
      // 画像フィールドを文字列に変換
      // technologiesが配列でない場合（文字列やオブジェクトの場合）に対応
      let technologies = work.technologies;
      if (technologies && !Array.isArray(technologies)) {
        // 文字列の場合は配列に変換
        if (typeof technologies === 'string') {
          technologies = technologies.split(',').map((tech: string) => tech.trim());
        } else {
          // オブジェクトの場合は空配列にする
          technologies = [];
        }
      }
      return {
        ...work,
        image: typeof work.image === 'object' ? work.image.url : work.image,
        technologies: technologies,
      } as Work;
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

// Column型の定義
export interface Column {
  id: string;
  title: string;
  subtitle?: string; // サブタイトル
  description: string;
  image: string | { url: string; width?: number; height?: number }; // MicroCMSの画像フィールド
  slug: string;
  content?: string; // 詳細ページ用のコンテンツ（HTML形式）
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

// すべてのColumnsを取得
export async function getAllColumns(): Promise<Column[]> {
  try {
    const data = await client.get({
      endpoint: 'columns',
      queries: {
        fields: 'id,title,subtitle,description,image,slug,createdAt,updatedAt,publishedAt',
        orders: '-publishedAt',
      },
    });
    // 画像フィールドを文字列に変換
    const columns = data.contents.map((column: any) => ({
      ...column,
      image: typeof column.image === 'object' ? column.image.url : column.image,
    }));
    return columns as Column[];
  } catch (error) {
    console.error('Error fetching columns:', error);
    return [];
  }
}

// スラッグから特定のColumnを取得
export async function getColumnBySlug(slug: string): Promise<Column | null> {
  try {
    const data = await client.get({
      endpoint: 'columns',
      queries: {
        filters: `slug[equals]${slug}`,
        fields: 'id,title,subtitle,description,image,slug,content,createdAt,updatedAt,publishedAt',
      },
    });
    
    if (data.contents && data.contents.length > 0) {
      const column = data.contents[0];
      // 画像フィールドを文字列に変換
      return {
        ...column,
        image: typeof column.image === 'object' ? column.image.url : column.image,
      } as Column;
    }
    return null;
  } catch (error) {
    console.error('Error fetching column by slug:', error);
    return null;
  }
}

// すべてのColumnスラッグを取得（静的生成用）
export async function getAllColumnSlugs(): Promise<string[]> {
  try {
    const data = await client.get({
      endpoint: 'columns',
      queries: {
        fields: 'slug',
      },
    });
    return data.contents.map((item: { slug: string }) => item.slug);
  } catch (error) {
    console.error('Error fetching column slugs:', error);
    return [];
  }
}

// Blog型の定義（カテゴリ: TECH | LIFE）
export type BlogCategory = 'TECH' | 'LIFE';

export interface Blog {
  id: string;
  title: string;
  slug: string;
  category: BlogCategory;
  /** サムネイルURL（MicroCMS 画像フィールド `thumbnail` を取得後に正規化） */
  thumbnail?: string;
  content?: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

function normalizeBlogThumbnail(blog: Blog & { thumbnail?: unknown }): Blog {
  const t = blog.thumbnail;
  if (t == null) return blog;
  const url =
    typeof t === 'string'
      ? t
      : typeof t === 'object' && t !== null && 'url' in t
        ? String((t as { url: string }).url)
        : undefined;
  if (!url) return blog;
  return { ...blog, thumbnail: url };
}

// 静的フォールバック用のブログデータ（MicroCMS設定前用）
const FALLBACK_BLOGS: Blog[] = [
  {
    id: '1',
    title: 'eJPTのラボ演習：ルーティングの概念と実践',
    slug: 'ejpt-routing-lab',
    category: 'TECH',
    thumbnail: '/images/scope.png',
    content: '<p>（MicroCMSで本文を管理する予定です）</p>',
    publishedAt: '2026-02-23T00:00:00.000Z',
    createdAt: '2026-02-23T00:00:00.000Z',
    updatedAt: '2026-02-23T00:00:00.000Z',
  },
  {
    id: '2',
    title: 'オーソドックススタイルにおける左ガードの視界の確保',
    slug: 'orthodox-left-guard-view',
    category: 'LIFE',
    thumbnail: '/images/boxer.png',
    content: '<p>（MicroCMSで本文を管理する予定です）</p>',
    publishedAt: '2026-02-20T00:00:00.000Z',
    createdAt: '2026-02-20T00:00:00.000Z',
    updatedAt: '2026-02-20T00:00:00.000Z',
  },
  {
    id: '3',
    title: 'Next.jsとmicroCMSでブログ機能を構築してみた',
    slug: 'nextjs-microcms-blog',
    category: 'TECH',
    thumbnail: '/images/program_code.png',
    content: '<p>（MicroCMSで本文を管理する予定です）</p>',
    publishedAt: '2026-02-18T00:00:00.000Z',
    createdAt: '2026-02-18T00:00:00.000Z',
    updatedAt: '2026-02-18T00:00:00.000Z',
  },
  {
    id: '4',
    title: '鉄フライパンで育てる日常のひととき',
    slug: 'cast-iron-daily',
    category: 'LIFE',
    thumbnail: '/images/desk.png',
    content: '<p>（MicroCMSで本文を管理する予定です）</p>',
    publishedAt: '2026-02-15T00:00:00.000Z',
    createdAt: '2026-02-15T00:00:00.000Z',
    updatedAt: '2026-02-15T00:00:00.000Z',
  },
];

// すべてのBlogを取得（MicroCMSがあればAPI、なければフォールバック）
export async function getAllBlogs(): Promise<Blog[]> {
  try {
    const data = await client.get({
      endpoint: 'blog',
      queries: {
        fields: 'id,title,slug,category,thumbnail,content,createdAt,updatedAt,publishedAt',
        orders: '-publishedAt',
      },
    });
    const contents = (data.contents || []) as Blog[];
    return contents.map((b) => normalizeBlogThumbnail(b));
  } catch {
    return FALLBACK_BLOGS.map((b) => normalizeBlogThumbnail(b));
  }
}

// スラッグから特定のBlogを取得
export async function getBlogBySlug(slug: string): Promise<Blog | null> {
  try {
    const data = await client.get({
      endpoint: 'blog',
      queries: {
        filters: `slug[equals]${slug}`,
        fields: 'id,title,slug,category,thumbnail,content,createdAt,updatedAt,publishedAt',
      },
    });
    if (data.contents && data.contents.length > 0) {
      return normalizeBlogThumbnail(data.contents[0] as Blog);
    }
  } catch {
    // fallback
  }
  const found = FALLBACK_BLOGS.find((b) => b.slug === slug);
  return found ? normalizeBlogThumbnail(found) : null;
}

// すべてのBlogスラッグを取得（静的生成用）
export async function getAllBlogSlugs(): Promise<string[]> {
  try {
    const data = await client.get({
      endpoint: 'blog',
      queries: { fields: 'slug' },
    });
    return (data.contents || []).map((item: { slug: string }) => item.slug);
  } catch {
    return FALLBACK_BLOGS.map((b) => b.slug);
  }
}

