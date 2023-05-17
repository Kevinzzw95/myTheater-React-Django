import { movieCommon } from "../../types/movie";
import url from "../../config/url";

type Props = {
    movie: movieCommon;
}

const Detail = ({ movie }: Props) => {

    return (
        <section>
            <div className="container">
                <div className="items-start px-4 pt-10">
                    <h1 className="text-4xl font-bold py-2">{ movie.title }</h1>
                </div>
                <div className="introduction max_width px-4 grid md:grid-cols-2 lg:grid-cols-3 item-start gap-4">
                    <img src={ url.org_url + movie.poster_path } className="h-[90%] rounded-lg shadow-2xl justify-self-start" />
                    <div className="lg:col-span-2 space-y-5">
                        <div className="badge badge-outline">Button</div>
                        <p className="py-6">{ movie.overview }</p>
                    </div> 
                </div>
            </div>
            
                
        </section>
    )
}

export default Detail;