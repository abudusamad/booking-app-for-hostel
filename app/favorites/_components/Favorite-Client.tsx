import { Container } from "@/app/components/Containter";
import Heading from "@/app/components/Heading";
import { SafeListing, SafeUser } from "@/types";

interface FavoritesClientProps {
    listings: SafeListing[];
    currentUser?: SafeUser | null;

}

const FavoritesClient = ({
    listings,
    currentUser
}:FavoritesClientProps) => {
    return (
        <Container>
            <Heading
                title="Favorites"
                subtitle="Your favorite listings"
            
            />
        </Container>
    );
}
 
export default FavoritesClient;