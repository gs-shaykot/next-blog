import React from 'react'
import catBgc from '../../../../public/catBgc.jpg';
export default function CategorySec({ categories }) {

    return
    (
        <div className='w-full h-[400px] bg-cover bg-center flex items-center justify-center' style={{ backgroundImage: `url(${catBgc})` }}>
            <h1>hello pello</h1>
        </div>
    )
}
