
// Types matching the Backend Pydantic Models

import { ComponentType } from "react";

export type ProjectTier = "basic" | "standard" | "premium";

export interface ServiceCatalogItem {
    _id: string;
    name: string;
    description: string;
    base_price: number;
    tiers: Record<ProjectTier, { delivery: string; includes: string }>;
}

export interface Challenge {
    _id: string;
    title: string;
    description: string;
    dataset_url: string;
    starter_code: string;
    passing_accuracy: number;
}


export type Service = {
  id: string;
  title: string;
  summary: string;
  outcomes: string[];
  icon: ComponentType<{ size?: number }>;
};