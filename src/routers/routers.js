import Favorites from "../pages/Favorites";
import Feed from "../pages/Feed";
import Library from "../pages/Library";
import Player from "../pages/Player";
import Trending from "../pages/Trending";

const RoutesPublic = [
    {
        path : '/',
        element : <Feed />
    },
    {
        path : '/favorites',
        element : <Favorites/>
    },
    {
        path : '/library',
        element : <Library />
    },
    {
        path : '/player',
        element : <Player/>
    },
    {
        path : '/trending',
        element : <Trending/>
    }
]
export default RoutesPublic;