import { movieCommon } from "../../types/movie";

type Props = {
    movie: movieCommon;
}
const Detail = ({ movie }: Props) => {
    return (
        <section>
            <div className="container pt-16">
                <div className="items-start px-4 pt-10">
                    <h1 className="text-4xl font-bold py-2">{ movie.name }</h1>
                </div>
                <div className="introduction max_width px-4 grid md:grid-cols-2 lg:grid-cols-3 item-start gap-4">
                    <img src={require("../../assets/pokemon.jpg")} className="h-[90%] rounded-lg shadow-2xl justify-self-start" />
                    <div className="lg:col-span-2 space-y-5">
                        <div className="badge badge-outline">Button</div>
                        <p className="py-6">All Rise is a courthouse drama that follows the chaotic, hopeful and sometimes absurd lives of its judges, prosecutors and public defenders, as they work with bailiffs, clerks and cops to get justice for the people of Los Angeles amidst a flawed legal process. Among them is newly appointed Judge Lola Carmichael, a highly regarded and impressive deputy district attorney who doesn't intend to sit back on the bench in her new role, but instead leans in, immediately pushing the boundaries and challenging the expectations of what a judge can be.</p>
                        <p className="py-6">All Rise is a courthouse drama that follows the chaotic, hopeful and sometimes absurd lives of its judges, prosecutors and public defenders, as they work with bailiffs, clerks and cops to get justice for the people of Los Angeles amidst a flawed legal process. Among them is newly appointed Judge Lola Carmichael, a highly regarded and impressive deputy district attorney who doesn't intend to sit back on the bench in her new role, but instead leans in, immediately pushing the boundaries and challenging the expectations of what a judge can be.</p>

                        <button className="btn btn-primary">Get Started</button>
                    </div> 
                </div>
            </div>
            
                
        </section>
    )
}

export default Detail;