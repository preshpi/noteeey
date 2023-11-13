export interface Cardsprops {
    content: string;
    date: string | null;
    id: string;
    additionalClasses?: string;
    handleDeleteCard: (id: string) => void; 
}