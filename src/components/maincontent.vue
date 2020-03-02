<template>
<div class="content">
    <div id="content_buttons">
        <button type="button" id="btn1" class="content_btn">Shoes</button>
        <button type="button" id="btn2" class="content_btn">Clothes</button>
        <button type="button" id="btn3" class="content_btn">Pants</button>
        <button type="button" id="btn4" class="content_btn">Electronic Devices</button>
        <button type="button" id="btn5" class="content_btn">Books</button>
    </div>

    <div id="content_advs">
        <img id="img1" src="https://2app.kicksonfire.com/kofapp/upload/events_master_images/ipad_a6228e683e8b5b0bfa8730b2cf403a6e5e03ebe0eb7ff.jpg" alt="shoes" class="content_img_adv">
        <img id="img2" src="https://cdn.shopify.com/s/files/1/0071/3637/8998/articles/palace-hypebeast-mens-fashion-style-streetwear_1024x1024.jpg?v=1542114553" alt="clothes" class="content_img_adv">
        <img id="img3" src="https://image-cdn.hypb.st/https%3A%2F%2Fhypebeast.com%2Fimage%2F2019%2F08%2Fsupreme-fall-winter-2019-pants-1.jpg?q=75&w=800&cbr=1&fit=max" alt="pants" class="content_img_adv">
        <img id="img4" src="https://www.samma3a.com/tech/en/wp-content/uploads/sites/2/2018/12/razer-blade-15-gaming-laptop-setup.png" alt="electronics" class="content_img_adv">
        <img id="img5" src="https://martijnscheijbeler.com/wp-content/uploads/books.jpg" alt="books" class="content_img_adv">
        <img>
    </div>
</div>
</template>

<script>
export default {
    name: "MainContent"
}
</script>

<style scoped>
#content_buttons
{
    margin-left: auto;
    margin-right: auto;
    margin-top: 10px;
    width: 80%;
    padding: 10px;
    text-align: center;
    overflow: hidden;
}

.content_btn
{
    display: inline-block;
    width: 15%;
    height: 40px;
    margin-left: 10px;
    margin-right: 10px;
    overflow: hidden;
    font-size: 20px;
    font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
    border-style: none;
    line-height: 40px;
    background-color: bisque;
    border-radius: 10px;
    color: #ac3b3b;
    cursor: pointer;
    outline: none;
}

.content_btn:hover
{
    background-color: rgb(58, 78, 104);
    color: azure;
}

#content_advs
{
    height: 500px;
    width: 95%;
    display: flex;
    overflow-x: hidden;
    overflow-y: hidden;
    margin-left: auto;
    margin-right: auto;
    border-radius: 10px;
    margin-top: 10px;
    border-style: dashed
}

.content_img_adv
{
    width: 100%;
    object-fit: cover;
    flex-shrink: 0;
    height: 100%;
    animation-name: adv_slide;
    animation-duration: 30s;
    animation-direction: normal;
    animation-timing-function: ease;
    animation-iteration-count: infinite;
}

@keyframes adv_slide
{
    0% {transform: translateX(0);}
    20% {transform: translateX(-100%);}
    40% {transform: translateX(-200%);}
    60% {transform: translateX(-300%);}
    80% {transform: translateX(-400%);}
    100% {transform: translateX(0);}
}
</style>