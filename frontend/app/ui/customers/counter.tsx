'use client'

import {CounterButton} from '@/app/ui/customers/buttons';
import {useState} from "react";

export default function Counter() {
    const [count, setCount] = useState(0);

    return (
        <div>
            <span>{count} </span>
            <CounterButton onClickHandler={() => setCount(count + 1)}/>
        </div>
    )
}