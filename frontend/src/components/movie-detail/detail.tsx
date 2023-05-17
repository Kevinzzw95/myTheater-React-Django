import { movieCommon } from "../../types/movie";
import url from "../../config/url";
import { useContext, useState } from "react";
import { GenreContext } from "../../context/genre.context";
import API_KEY from "../../config/api";
import { actor } from "../../types/movie";
import axios from "axios";


type Props = {
    movie: movieCommon;
}

interface ActorListProps{
	id: number,
  cast: actor[],
}

const Detail = ({ movie }: Props) => {
    const { genres } = useContext(GenreContext);
		const [ actors, setActors ] = useState<actor[]>([]);
		const actor_url = url.base_url + `/movie/${movie.id}/credits?api_key=${API_KEY}`;
		
		axios.get<ActorListProps>(actor_url)
		.then(
			res => setActors(res.data.cast),
			err => console.log(err)
		);

    return (
        <section>
            <div className="container">
                <div className="items-start px-4 pt-10">
                    <h1 className="text-4xl font-bold py-2">{ movie.title }</h1>
                </div>
                <div className="max_width px-4 grid md:grid-cols-2 lg:grid-cols-3 item-start gap-4">
										<div className="max-h-[70%] p-5">
											<img src={ url.org_url + movie.poster_path } className="h-[90%] rounded-lg shadow-2xl justify-self-start" />

										</div>
                    <div className="lg:col-span-2 space-y-5 space-x-2">
												{movie.genre_ids.map((movieGenre) => 
													(
														<div className="badge badge-outline">{genres.find((genre) => genre.id === movieGenre)!.name}</div>
													)
                    		)}
                    	<p className="py-6">{ movie.overview }</p>
											<h1 className="text-lg">Cast</h1>
											<div className="container h-[30%] overflow-y-scroll">
												<div className="px-4 grid grid-cols-8 item-start gap-4">
												{actors.map((actor) =>
													<div>
														<img src={ url.org_url + actor.profile_path } />
													</div>
												)}
											</div>
											</div>
											
                    </div> 
                </div>
            </div>
            
                
        </section>
    )
}

export default Detail;