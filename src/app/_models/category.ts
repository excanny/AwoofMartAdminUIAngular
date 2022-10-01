export interface Category {
    category_id: string;
    domain_id: string;
    category_name: string;
    parent_id: number;
    description: string;
    uploaded_file_path: string;
    allow_merchant_upload: boolean;
}
