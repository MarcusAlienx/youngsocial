import { createClient } from '@supabase/supabase-js';
import type { Database } from '../types/database';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// Helper functions for admin operations
export const adminApi = {
  // Check if current user is admin
  async isAdmin(): Promise<boolean> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return false;

    const { data } = await supabase
      .from('admin_users')
      .select('id')
      .eq('id', user.id)
      .eq('is_active', true)
      .single();

    return !!data;
  },

  // Products
  async getProducts() {
    return supabase
      .from('products')
      .select(`
        *,
        category:categories(*),
        images:product_images(*),
        sizes:product_sizes(*, size:sizes(*)),
        colors:product_colors(*, color:colors(*))
      `)
      .order('created_at', { ascending: false });
  },

  async createProduct(product: any) {
    return supabase
      .from('products')
      .insert(product)
      .select()
      .single();
  },

  async updateProduct(id: string, updates: any) {
    return supabase
      .from('products')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
  },

  async deleteProduct(id: string) {
    return supabase
      .from('products')
      .delete()
      .eq('id', id);
  },

  // Categories
  async getCategories() {
    return supabase
      .from('categories')
      .select('*')
      .order('sort_order');
  },

  async createCategory(category: any) {
    return supabase
      .from('categories')
      .insert(category)
      .select()
      .single();
  },

  async updateCategory(id: string, updates: any) {
    return supabase
      .from('categories')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
  },

  // Sizes
  async getSizes() {
    return supabase
      .from('sizes')
      .select('*')
      .order('sort_order');
  },

  // Colors
  async getColors() {
    return supabase
      .from('colors')
      .select('*')
      .order('sort_order');
  },

  // Product Images
  async addProductImage(productId: string, imageData: any) {
    return supabase
      .from('product_images')
      .insert({ product_id: productId, ...imageData })
      .select()
      .single();
  },

  async deleteProductImage(imageId: string) {
    return supabase
      .from('product_images')
      .delete()
      .eq('id', imageId);
  },

  // Product Sizes
  async setProductSizes(productId: string, sizeIds: string[]) {
    // Delete existing sizes
    await supabase
      .from('product_sizes')
      .delete()
      .eq('product_id', productId);

    // Insert new sizes
    if (sizeIds.length > 0) {
      const sizesToInsert = sizeIds.map(sizeId => ({
        product_id: productId,
        size_id: sizeId
      }));

      return supabase
        .from('product_sizes')
        .insert(sizesToInsert);
    }
  },

  // Product Colors
  async setProductColors(productId: string, colorIds: string[]) {
    // Delete existing colors
    await supabase
      .from('product_colors')
      .delete()
      .eq('product_id', productId);

    // Insert new colors
    if (colorIds.length > 0) {
      const colorsToInsert = colorIds.map(colorId => ({
        product_id: productId,
        color_id: colorId
      }));

      return supabase
        .from('product_colors')
        .insert(colorsToInsert);
    }
  }
};

// Public API for frontend
export const publicApi = {
  async getProducts() {
    return supabase
      .from('products')
      .select(`
        *,
        category:categories(*),
        images:product_images(*),
        sizes:product_sizes(*, size:sizes(*)),
        colors:product_colors(*, color:colors(*))
      `)
      .eq('is_active', true)
      .order('sort_order');
  },

  async getProductsByCategory(categoryId: string) {
    return supabase
      .from('products')
      .select(`
        *,
        category:categories(*),
        images:product_images(*),
        sizes:product_sizes(*, size:sizes(*)),
        colors:product_colors(*, color:colors(*))
      `)
      .eq('category_id', categoryId)
      .eq('is_active', true)
      .order('sort_order');
  },

  async getFeaturedProducts() {
    return supabase
      .from('products')
      .select(`
        *,
        category:categories(*),
        images:product_images(*),
        sizes:product_sizes(*, size:sizes(*)),
        colors:product_colors(*, color:colors(*))
      `)
      .eq('is_featured', true)
      .eq('is_active', true)
      .order('sort_order')
      .limit(8);
  },

  async getCategories() {
    return supabase
      .from('categories')
      .select('*')
      .eq('is_active', true)
      .order('sort_order');
  }
};