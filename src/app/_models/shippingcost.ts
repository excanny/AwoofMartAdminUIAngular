export interface ShippingCost {
    shipping_cost_id: string;
    weight: number;
    parent_category_name: string;
    sub_category_name: string;
    child_category_name: string;
    source_location: string;
    delivery_location: string;
    delivery_timeline: number;
}