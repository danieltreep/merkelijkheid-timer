<template>
    <div class="accordion" id="accordionExample">
        <div class="accordion-item">
            <div class="accordion-header py-2 gap-3">
                <button class="btn show-content-button d-flex align-items-center gap-2 justify-content-center collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="true" aria-controls="collapseThree">
                    5 
                    <img src="@/assets/chevron-icon.svg" alt="">
                </button>
                <div class="position-relative d-flex align-items-center">
                    <div class="bolletje me-2"></div>
                    <p class="mb-0 me-3">Albeton</p>
                    <div class="project">Project</div>
                </div>
                <div class="duur">03:00</div>
            </div>
            <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                <div class="accordion-body p-0">
                    <ul class="ps-0">
                        <li class="list-group-item list-item-accordion py-2 d-grid align-items-center justify-content-between">
                            Dit is de bescrhrijving van een taak
                            <div class="collega d-flex align-items-center gap-2">
                                <img src="@/assets/avatar.png" alt="">
                                Sam Verloop
                            </div>
                            <div class="d-flex align-items-center gap-2">
                                <img src="@/assets/date-icon.svg" alt="">
                                04-05-2024
                            </div>
                            <div class="duur">03:00</div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>

</template>
<script setup>

</script>
<style scoped>
.accordion {
    border-radius: 0;
    box-shadow: none;
}
.accordion-item {
    border-radius: 0;
    overflow: hidden;
    border: none;
    border-bottom: 1px solid #EDEEF1;
}
.accordion-item:last-child {
    border-radius: 0 0 var(--br) var(--br);
    border: none;
}
.accordion-header {
    grid-template-columns: 50px 1fr 67px;
    display: grid;
    font-size: 14px;
}
.accordion-header {
    padding-inline: 2rem 1rem;
}
.accordion-body {
    background-color: #F9F9F9;
    padding-inline: 0;
}

.list-item-accordion {
    background-color: transparent;
    padding-right: 1.8rem;
    grid-template-columns: 55% 1fr 1fr 55px;
}
.show-content-button {
    border: 1px solid var(--border);
    width: 50px;
    border-radius: 30px;
    font-size: 12px;
}
.duur {
  font-size: 20px;
  font-weight: 500;
}
.btn img {
    transform: rotate(-180deg);
    transition: .3s;
}
.btn.collapsed img {
    transform: rotate(0);
}
</style>