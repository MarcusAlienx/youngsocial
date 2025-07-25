export interface Database {
  public: {
    Tables: {
      admin_users: {
        Row: {
          id: string;
          email: string;
          full_name: string;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          full_name: string;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      categories: {
        Row: {
          id: string;
          name: string;
          name_en: string;
          slug: string;
          description: string;
          description_en: string;
          image_url: string;
          is_active: boolean;
          sort_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          name: string;
          name_en: string;
          slug: string;
          description?: string;
          description_en?: string;
          image_url?: string;
          is_active?: boolean;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          name_en?: string;
          slug?: string;
          description?: string;
          description_en?: string;
          image_url?: string;
          is_active?: boolean;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      sizes: {
        Row: {
          id: string;
          name: string;
          sort_order: number;
          is_active: boolean;
          created_at: string;
        };
        Insert: {
          id: string;
          name: string;
          sort_order?: number;
          is_active?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          sort_order?: number;
          is_active?: boolean;
          created_at?: string;
        };
      };
      colors: {
        Row: {
          id: string;
          name: string;
          name_en: string;
          hex_code: string;
          is_active: boolean;
          sort_order: number;
          created_at: string;
        };
        Insert: {
          id: string;
          name: string;
          name_en: string;
          hex_code: string;
          is_active?: boolean;
          sort_order?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          name_en?: string;
          hex_code?: string;
          is_active?: boolean;
          sort_order?: number;
          created_at?: string;
        };
      };
      products: {
        Row: {
          id: string;
          name: string;
          name_en: string;
          description: string;
          description_en: string;
          price: number;
          original_price: number | null;
          category_id: string;
          sku: string | null;
          stock_quantity: number;
          is_active: boolean;
          is_featured: boolean;
          is_new: boolean;
          on_sale: boolean;
          meta_title: string;
          meta_description: string;
          sort_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          name_en: string;
          description?: string;
          description_en?: string;
          price: number;
          original_price?: number | null;
          category_id: string;
          sku?: string | null;
          stock_quantity?: number;
          is_active?: boolean;
          is_featured?: boolean;
          is_new?: boolean;
          on_sale?: boolean;
          meta_title?: string;
          meta_description?: string;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          name_en?: string;
          description?: string;
          description_en?: string;
          price?: number;
          original_price?: number | null;
          category_id?: string;
          sku?: string | null;
          stock_quantity?: number;
          is_active?: boolean;
          is_featured?: boolean;
          is_new?: boolean;
          on_sale?: boolean;
          meta_title?: string;
          meta_description?: string;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      product_images: {
        Row: {
          id: string;
          product_id: string;
          image_url: string;
          alt_text: string;
          sort_order: number;
          is_primary: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          product_id: string;
          image_url: string;
          alt_text?: string;
          sort_order?: number;
          is_primary?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          product_id?: string;
          image_url?: string;
          alt_text?: string;
          sort_order?: number;
          is_primary?: boolean;
          created_at?: string;
        };
      };
      product_sizes: {
        Row: {
          id: string;
          product_id: string;
          size_id: string;
          is_available: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          product_id: string;
          size_id: string;
          is_available?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          product_id?: string;
          size_id?: string;
          is_available?: boolean;
          created_at?: string;
        };
      };
      product_colors: {
        Row: {
          id: string;
          product_id: string;
          color_id: string;
          is_available: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          product_id: string;
          color_id: string;
          is_available?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          product_id?: string;
          color_id?: string;
          is_available?: boolean;
          created_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      is_admin: {
        Args: {
          user_id?: string;
        };
        Returns: boolean;
      };
    };
    Enums: {
      [_ in never]: never;
    };
  };
}