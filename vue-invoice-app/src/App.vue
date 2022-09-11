<template>
    <div>
        <div class="app">
            <Navigation />
            <div class="app-content">
                <transition name="invoice">
                    <InvoiceForm v-if="invoiceModal" />
                </transition>

                <router-view />
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import Navigation from './components/Navigation.vue';
import InvoiceForm from './components/InvoiceModel.vue';
export default {
    name: 'App',
    components: {
        Navigation,
        InvoiceForm,
    },
    computed: {
        ...mapState(['invoiceModal']),
    },
};
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap');
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif;
}

.app {
    display: flex;
    flex-direction: column;
    background-color: #141625;

    min-height: 100vh;
    @media (min-width: 900px) {
        flex-direction: row;
    }

    .app-content {
        display: flex;
        flex-direction: column;

        padding: 0 20px;
        flex: 1;
        position: relative;
    }
}

.invoice-enter-active,
.invoice-leave-active {
    transition: 0.8s ease all;
}

.invoice-enter-from,
.invoice-leave-to {
    transform: translateX(-700px);
}

button,
.button {
    cursor: pointer;
    padding: 16px 24px;
    border-radius: 30px;
    border: none;
    font-size: 12px;
    margin-right: 8px;
    color: #fff;
}

.dark-purple {
    background-color: #252945 !important ;
    &:hover {
        background-color: #1c1e37 !important ;
    }
}

.red {
    background-color: #ec5757 !important ;
    &:hover {
        background-color: #cd4c4c !important ;
    }
}

.purple {
    background-color: #7c5dfa !important ;
    &:hover {
        background-color: #674bd5 !important ;
    }
}

.green {
    background-color: #33d69f !important ;
    &:hover {
        background-color: #2cb98a !important ;
    }
}

.orange {
    background-color: #ff8f00 !important ;
    &:hover {
        background-color: #db7d01 !important ;
    }
}

.container {
    width: 100%;
    padding: 40px 10px;
    max-width: 850px;
    margin: 0 auto;

    @media (min-width: 900px) {
        padding-top: 72px;
    }
}

.nav-link {
    text-decoration: none;
    color: initial;
}

.status-button {
    &::before {
        content: '';
        width: 10px;
        height: 10px;
        border-radius: 50%;
        margin-right: 8px;
    }
    font-size: 12px;
    margin-right: 30px;
    align-items: center;
    padding: 8px 30px;
    border-radius: 10px;
}

.paid {
    &::before {
        background-color: #33d69f;
    }
    color: #33d89f;
    background-color: rgba(51, 214, 160, 0.1);
}

.pending {
    &::before {
        background-color: #ff8f00;
    }

    color: #ff8f00;
    background-color: rgba(255, 145, 0, 0.1);
}

.draft {
    &::before {
        color: #dfe3fa;
        background-color: rgba(233, 227, 250, 0.1);
    }

    color: #dfe3fa;
    background-color: rgba(233, 227, 250, 0.1);
}
</style>
