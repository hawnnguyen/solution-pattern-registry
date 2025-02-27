export interface Tag {
    tagId: string;
    tagName: string;
    tagValue: string;
    className?: string;
    patternId?: string;
}

export interface Pattern {
    id?: string;
    title: string;
    name: string;
    url: string;
    ring: string;
    quadrant: string;
    status: string;
    description: string;
    phase: string;
    tags: Tag[];
}
