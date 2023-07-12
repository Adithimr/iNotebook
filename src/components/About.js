import React from 'react'
export const About = () => { 
  return (
    <div>
    <div class="accordion" id="accordionExample">
  <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
      iNotebook
      </button>
    </h2>
    <div id="collapseOne" class="accordion-collapse collapse show" data-bs-parent="#accordionExample">
      <div class="accordion-body">
      This is a note making app.In this application.We can signup as new users and can make different notes.
      We can also login as user.Here we can create,delete and update notes.Each note consists of title,Description and tag fields.User can store notes of different events of their work 
      </div>
    </div>
  </div>
</div>  
</div>
  )
}
export default About