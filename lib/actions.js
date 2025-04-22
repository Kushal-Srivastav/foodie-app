'use server'

import { revalidatePath } from "next/cache"
import saveMeal from "./meals"
import { redirect } from "next/navigation"

function isInvalidText(){
  return!text || text.trim() === ''
}

export async function shareMeal(prevState, formData){
   const meal = {
      title:formData.get('title'),
      summary: formData.get('summary'),
      instructions: formData.get('instruction'),
      image: formData.get('image'),
      creator: formData.get('name'),
      creator_email: formData.get('email'),
    }

    if(isInvalidText(meal.title) || isInvalidText(meal.summary) ||
     isInvalidText(meal.instructions) || isInvalidText(meal.creator) ||
     isInvalidText(meal.creator_email) ||
     !meal.creator_email.includes('@') ||
     !meal.image || meal.image.size === 0
    ){
       return {
        message: 'Invalid input.'
       };
    }

await saveMeal(meal)
revalidatePath('/meals') //revalidate the cache that belongs to a certain path
redirect('/meals')
  }