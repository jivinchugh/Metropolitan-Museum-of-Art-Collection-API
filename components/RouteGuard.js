import { useRouter } from 'next/router';
import { useState, useEffect, useCallback } from 'react';
import { useAtom } from 'jotai';
import { getFavourites, getHistory } from '@/lib/userData';
import { favouritesAtom, searchHistoryAtom } from '@/store';
import { isAuthenticated } from '@/lib/authenticate';
const PUBLIC_PATHS = ['/', '/login', '/_error', '/register'];

export default function RouteGuard(props) {
    const router = useRouter();
    const [authorized, setAuthorized] = useState(false);

    const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

    // Define updateAtoms inside useEffect callback using useCallback
    const updateAtoms = useCallback(async () => {
        setSearchHistory(await getHistory());
        setFavouritesList(await getFavourites());
    }, [setSearchHistory, setFavouritesList]);

    useEffect(() => {
        updateAtoms(); // Call updateAtoms inside useEffect
        const handleRouteChange = (url) => authCheck(url);
        router.events.on('routeChangeComplete', handleRouteChange);
        return () => {
            router.events.off('routeChangeComplete', handleRouteChange);
        };
    }, [router.events, router.pathname, updateAtoms]); // Remove authCheck from useEffect dependencies

    // Define authCheck inside useEffect callback using useCallback
    const authCheck = useCallback((url) => {
        const path = url.split('?')[0];
        if (!isAuthenticated() && !PUBLIC_PATHS.includes(path)) {
            setAuthorized(false);
            router.push('/login');
        } else {
            setAuthorized(true);
        }
    }, [router, setAuthorized]);

    return <>{authorized && props.children}</>;
}