import getCurrentUser from "../actions/getCurrentUser";
import getListings from "../actions/getListings";
import ClientOnly from "../components/ClientOnly";
import EmpltyState from "../components/EmptyState";
import PropertiesClient from "./_components/properties-client";

const PropertiesPage = async () => {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
        return (
            <ClientOnly>
                <EmpltyState
                    title="Unathorized"
                    subtitle="You must be signed in to view this page."
                
                />
            </ClientOnly>
        )
    }

    const listings = await getListings({userId: currentUser.id})
    return (<ClientOnly>
        <PropertiesClient
            listings={listings}
            currentUser={currentUser}
        
        />
    </ClientOnly> );
}
 
export default PropertiesPage;