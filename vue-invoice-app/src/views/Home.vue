<template>
    <div class="home-container">
        <div class="header">
            <div class="left">
                <h1>Invoices</h1>
                <span>There are 4 total invoices</span>
            </div>
            <div class="right">
                <div class="filter" @click="toggleFilterMenu" ref="filter">
                    <span>Filter by status</span>
                    <unicon name="arrow-down" fill="purple" />
                    <ul v-show="filterMenu" class="filter-menu">
                        <li>Draft</li>
                        <li>Pending</li>
                        <li>Paid</li>
                        <li>Clear Filter</li>
                    </ul>
                </div>
                <div @click="newInvoice" class="button">
                    <div class="inner-button">
                        <unicon name="plus" fill="purple" />
                    </div>
                    <span>New Invoice</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'MyHome',
    data() {
        return {
            filterMenu: null,
        };
    },
    components: {},
    methods: {
        newInvoice() {},
        toggleFilterMenu() {
            console.log(this.filterMenu)
            this.filterMenu = !this.filterMenu;
        },
    },
};
</script>

<style lang="scss" scoped>
div.home-container {
    color: white;

    .header {
        display: flex;
        margin-bottom: 65px;

        .left,
        .right {
            display: flex;
            flex: 1;
        }

        .left {
            flex-direction: column;
        }

        .right {
            justify-content: flex-end;
            align-items: center;

            .button,
            .filter {
                display: flex;
                align-items: center;

                span {
                    font-size: 12px;
                }
            }

            .filter {
                position: relative;
                margin-right: 40px;
                cursor: pointer;

                unicon {
                    margin-left: 12px;
                    width: 9px;
                    height: 5px;
                }

                .filter-menu {
                    width: 120px;
                    position: absolute;
                    top: 25px;
                    list-style: none;
                    background-color: #1e2139;
                    box-shadow: 0 5px 6px -1px rgba(0, 0, 0, 0.1),
                        0 2px 4px 1px rgba(0, 0, 0.06);
                }

                li {
                    cursor: pointer;
                    font-size: 12px;
                    padding: 10px 20px;

                    &:hover {
                        color: #1e2139;
                        background-color: white;
                    }
                }
            }

            .button {
                padding: 8px 10px;
                background-color: #7c5dfa;
                border-radius: 40px;

                .inner-button {
                    display: flex;
                    margin-right: 8px;
                    padding: 8px;
                    border-radius: 50%;
                    align-items: center;
                    justify-content: center;
                    background-color: white;

                    unicon {
                        width: 10px;
                        height: 10px;
                    }
                }
            }
        }
    }

    div {
        display: flex;
    }
}
</style>
