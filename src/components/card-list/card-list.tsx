import SingleCard from "./single-card";

const tradinAlgoList = [
    {
        name: 'Momentum Trading',
        description: 'Utilize momentum indicators to identify trends and capitalize on price movements.',
        image: 'https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
        name: "Mean Reversion Trading",
        description: "Trade based on the assumption that prices will eventually revert to their historical averages.",
        image: 'https://images.pexels.com/photos/159888/pexels-photo-159888.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
        name: "Arbitage",
        description: "Exploit price differences of the same asset in different markets to make risk-free profits.",
        image: 'https://images.pexels.com/photos/210607/pexels-photo-210607.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    }
]


export default function CardList(){
    return (
        <div>
            <div className="flex flex-col lg:flex-row gap-10 justify-around items-center lg:items-start">
                {
                    tradinAlgoList.map((ele: any) => (
                        <SingleCard key={ele.name} title={ele.name} description={ele.description} image={ele.image} />
                    ))
                }
            </div>
        </div>
    )
}