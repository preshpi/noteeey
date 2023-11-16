export interface Cardsprops {
    content: string;
    date: string | null;
    id: string;
    loading?: boolean;
    additionalClasses?: string;
    handleDeleteCard: (id: string) => void; 
    handleUpdateDoc: (id: string,  newTitle: string) => void; 
}