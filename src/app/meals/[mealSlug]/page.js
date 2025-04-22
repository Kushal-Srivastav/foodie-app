// localhost:3000/meals/my-meal or something would activate the page.js file
//inside the slug, bu tif we pass any folder path then next js is smart enough to 
// call it separately and m=not through the activation of the slug.
import { getMeal } from '@/lib/meals'
import classes from './page.module.css'
import Image from 'next/image'
import { notFound } from 'next/navigation'

export async function generateMetaData({params}){
    const meal = getMeal(params.mealSlug)

    if(!meal){
        notFound();
       }
       
  return {
    title: meal.title,
    description: meal.summary
  }
}

export default function MealDetailsPage({params}){ //params here will have the value of the address
    //passed in the bar whereas the slug will have the key to that value
   const meal =  getMeal(params.mealSlug)
  
   meal.instructions = meal.instructions.replace(/\n/g, '<br/>')
    return <>
    <header className={classes.header}>
        <div className={classes.image}>
            <Image src={meal.image} alt={meal.title} fill/>
        </div>
        <div className={classes.headerText}>
            <h1>{meal.title}</h1>
           <p className={classes.creator}>
            by <a href={`mailto:${meal.creator_email}`}>{meal.creator}</a>
           </p>

           <p className={classes.summary}>{meal.summary}</p>
        </div>
    </header>
    <main>
        <p className={classes.instructions} dangerouslySetInnerHTML={{
            __html: meal.instructions,
        }}></p>
    </main>
    </>
}
