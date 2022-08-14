import React, {DragEvent, useState} from 'react';
import s from './App.module.css'

type ItemType = {
    id: number
    name: string
    rank: string
}

type DragDateType = {
    id: number
    initialRang: string
}

export const App = () => {

        const ranks = ['Mentor', 'User']

        const initialItems = [
            {id: 0, name: 'Evgeny', rank: 'Mentor'},
            {id: 1, name: 'Viktor', rank: 'User'},
            {id: 2, name: 'Galya', rank: 'Mentor'},
            {id: 3, name: 'Petr', rank: 'User'},
            {id: 4, name: 'Anna', rank: 'Mentor'},
            {id: 5, name: 'Vitali', rank: 'User'}
        ]

        const [items, setItems] = useState<ItemType[]>(initialItems)
        const [dragData, setDragData] = useState({} as DragDateType)


        const handleDragStart = (e: DragEvent<HTMLDivElement>, id: number, rank: string) => {
            setDragData({id: id, initialRang: rank})
        }


        const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
            e.preventDefault()
        }

        const changeCategory = (selected: number, rank: string) => {
            const copyItems = [...items];

            copyItems[selected].rank = rank;

            setItems(copyItems);
        };


        const handleDrop = (e: DragEvent<HTMLDivElement>, rank: string) => {
            const selected = dragData.id;
            changeCategory(selected, rank);
        };

        return (
            <div className={s.App}>
                <div className={s.ranks}>
                    {
                        ranks.map((rank, index) => (
                            <div key={index}
                                 className={s.rank}
                                 onDragOver={handleDragOver}
                                 onDrop={(e) => handleDrop(e, rank)}
                            >
                                <h1>{rank}</h1>
                                <div>
                                    {
                                        items
                                            .filter(item => item.rank === rank)
                                            .map((item) => (
                                                <div className={s.item}
                                                     key={item.id}
                                                     draggable
                                                     onDragStart={(e) => handleDragStart(e, item.id, rank)}
                                                >
                                                    {item.name}
                                                </div>
                                            ))
                                    }
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        );
    }
;
