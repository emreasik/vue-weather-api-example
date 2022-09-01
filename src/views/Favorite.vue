<template>
    <div class="favorite-page-wrapper">
        <main>
            <router-link class="router-wrap" to="/">Home Page</router-link>
            <h1>My Favorite Page</h1>
            <div class="weather-details-fav-wrapper" v-for="(item, index) in favList" :key="item.id">
                {{ index+1 }} - {{ item.name }},
                {{ item.sys.country }} <br>
                {{ item.weather[0].main }} <br>
                {{ Math.round(item.main.temp) }}°C
                {{ item.main.humidity }}%
                {{ item.wind.speed }}km/h
                <button class="btn btn-red" @click="deleteHandler(item.id)">Delete</button>
            </div>
        </main>
    </div>
</template>
  
<script>
export default {
    name: 'FavoriteList',
    data() {
        return {
            favList: {},
        }
    },
    async created() {
        const data = await JSON.parse(localStorage.getItem("favList")) || [];
        console.log(data);
        this.favList = data;
        console.log(this.favList);
    },
    methods: {
        deleteHandler(itemId) {
            console.log("delete çalıştı");
            const data = JSON.parse(localStorage.getItem("favList")) || [];
            console.log(data);
            const newItems = data.filter((item) => item.id !== itemId);
            console.log(newItems);
            window.localStorage.setItem('favList', JSON.stringify(newItems));
            this.$router.go()
        }
    }
}
</script>

<style lang="scss">
$light: #EEE;
$delete-red: red;


.favorite-page-wrapper {
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-image: url('../assets/hot-bg.png');
    background-size: cover;
    background-position: bottom;
    transition: 0.4s;
    text-align: center;

    & h1 {
        color: $light;
        font-size: 54px;
        font-weight: 500;
        text-shadow: 1px 3px rgba(0, 0, 0, 0.25);
        margin-top: 30px;
    }
}

.weather-details-fav-wrapper {
    margin: 0 auto;
    width: 50%;
    padding: 30px 40px;
    margin-top: 30px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    background-color: rgba(255, 255, 255, 0.3);
    border-radius: 30px;
    font-size: 20px;
    overflow: hidden;
    color: $light;

}

.btn {
    align-items: center;
    background: none;
    border: 1px solid lighten(gray, 24%);
    height: 48px;
    padding: 0 24px 0 16px;
    letter-spacing: .25px;
    border-radius: 24px;
    cursor: pointer;
    color: $light;

    &-red{
    border: 1px solid lighten($delete-red, 24%);
    }
}
</style>
  