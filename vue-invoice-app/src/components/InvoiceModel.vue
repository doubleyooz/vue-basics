<template>
    <div @click="checkClick" ref="invoiceWrap" class="invoice-wrap">
        <form @submit.prevent="submitForm" class="invoice-content">
            <h1>New Invoice</h1>

            <div class="bill-from">
                <h4>Bill From</h4>
                <div class="input">
                    <label for="billerStreetAddress">Street Address</label>
                    <input
                        required
                        type="text"
                        id="billerStreetAddress"
                        v-model="billerStreetAddress"
                    />
                </div>

                <div class="location-details">
                    <div class="input">
                        <label for="billerCity">City</label>
                        <input
                            required
                            type="text"
                            id="billerCity"
                            v-model="billerCity"
                        />
                    </div>
                    <div class="input">
                        <label for="billerZipCode">Zip Code</label>
                        <input
                            required
                            type="text"
                            id="billerZipCode"
                            v-model="billerZipCode"
                        />
                    </div>
                    <div class="input">
                        <label for="billerCountry">Country</label>
                        <input
                            required
                            type="text"
                            id="billerCountry"
                            v-model="billerCountry"
                        />
                    </div>
                </div>
            </div>

            <div class="bill-to">
                <h4>Bill To</h4>
                <div class="input">
                    <label for="clientName">Client's Name</label>
                    <input
                        required
                        type="text"
                        id="clientName"
                        v-model="clientName"
                    />
                </div>
                <div class="input">
                    <label for="clientEmail">Client's Email</label>
                    <input
                        required
                        type="text"
                        id="clientEmail"
                        v-model="clientEmail"
                    />
                </div>
                <div class="input">
                    <label for="clientStreetAddress"
                        >Client's Street Address</label
                    >
                    <input
                        required
                        type="text"
                        id="clientStreetAddress"
                        v-model="clientStreetAddress"
                    />
                </div>

                <div class="location-details">
                    <div class="input">
                        <label for="clientCity">City</label>
                        <input
                            required
                            type="text"
                            id="clientCity"
                            v-model="clientCity"
                        />
                    </div>
                    <div class="input">
                        <label for="clientZipCode">Zip Code</label>
                        <input
                            required
                            type="text"
                            id="clientZipCode"
                            v-model="clientZipCode"
                        />
                    </div>
                    <div class="input">
                        <label for="clientCountry">Country</label>
                        <input
                            required
                            type="text"
                            id="clientCountry"
                            v-model="clientCountry"
                        />
                    </div>
                </div>
            </div>

            <div class="invoice-work">
                <div class="payment">
                    <div class="input">
                        <label for="invoiceDate">Invoice Date</label>
                        <input
                            disabled
                            type="text"
                            id="invoiceDate"
                            v-model="invoiceDate"
                        />
                    </div>

                    <div class="input">
                        <label for="paymentDueDate">Payment Due</label>
                        <input
                            disabled
                            type="text"
                            id="paymentDueDate"
                            v-model="paymentDueDate"
                        />
                    </div>
                </div>
                <div class="input">
                    <label for="paymentTerms">Payment Terms</label>
                    <select
                        required
                        type="text"
                        id="paymentTerms"
                        v-model="paymentTerms"
                    >
                        <option value="30">Net 30 Days</option>
                        <option value="60">Net 60 Days</option>
                        <option value="90">Net 90 Days</option>
                    </select>
                </div>
                <div class="input">
                    <label for="productDescription">Product Description</label>
                    <input
                        required
                        type="text"
                        id="productDescription"
                        v-model="productDescription"
                    />
                </div>
                <div class="work-items">
                    <h3>Item List</h3>
                    <table class="item-list">
                        <tr class="table-heading">
                            <th class="item-name">Item Name</th>
                            <th class="quant">Quant</th>
                            <th class="price">Price</th>
                            <th class="total">Total</th>
                        </tr>
                        <tr
                            class="table-items"
                            v-for="{ item, index } in invoiceItemList"
                            :key="index"
                        >
                            <td class="item-name">
                                <input type="text" v-model="item.itemName" />
                            </td>
                            <td class="quant">
                                <input type="text" v-model="item.quant" />
                            </td>
                            <td class="price">
                                <input type="text" v-model="item.price" />
                            </td>
                            <td class="total">
                                ${{ (item.total = item.quant * item.price) }}
                            </td>
                            <unicon
                                @click="deleteInvoiceItem(item.id)"
                                name="close"
                                fill="purple"
                            />
                        </tr>
                    </table>
                    <div @click="addNewInvoice" class="button">
                        <unicon name="plus" fill="white" />
                        Add New Item
                    </div>
                </div>
                <div class="footer">
                    <div class="left">
                        <button @click="closeInvoice" class="red">
                            Cancel
                        </button>
                    </div>
                    <div class="right">
                        <button @click="saveDraft" class="dark-purple">
                            Save Draft
                        </button>
                        <button @click="publishInvoice" class="purple">
                            Create Invoice
                        </button>
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
import { mapMutations } from 'vuex';
export default {
    name: 'invoiceModel',
    data() {
        return {
            dateOptions: { year: 'numeric', month: 'short', day: 'numeric' },
            billerStreetAddress: null,
            billerCity: null,
            billerZipCode: null,
            billerCountry: null,
            clientName: null,
            clientEmail: null,
            clientStreetAddress: null,
            clientCity: null,
            clientZipCode: null,
            clientCountry: null,
            invoiceDateUnix: null,
            invoiceDate: null,
            paymentTerms: null,
            paymentDueDate: null,
            paymentDueDateUnix: null,
            productDescription: null,
            invoicePending: null,
            invoiceDraft: null,
            invoiceItemList: [],
            invoiceTotal: 0,
        };
    },
    created() {
        this.invoiceDateUnix = Date.now();
        this.invoiceDate = new Date(this.invoiceDateUnix).toLocaleDateString(
            'en-us',
            this.dateOptions
        );
    },
    methods: {
        ...mapMutations(['TOGGLE_INVOICE']),
        closeInvoice() {
            this.TOGGLE_INVOICE();
        },
    },
    watch: {
        paymentTerms() {
            const futureDate = new Date();
            this.paymentDueDateUnix = futureDate.setDate(
                futureDate.getDate() + parseInt(this.paymentTerms)
            );
            this.paymentDueDate = new Date(
                this.paymentDueDateUnix
            ).toLocaleDateString('en-us', this.dateOptions);
        },
    },
};
</script>

<style lang="scss" scoped>
.invoice-wrap {
    display: flex;
    flex-direction: column;

    position: fixed;
    top: 0;
    left: 0;
    background-color: transparent;

    width: 100%;
    height: 100vh;

    overflow-y: scroll;

    @media (min-width: 900px) {
        left: 90px;
    }

    &::-webkit-scrollbar {
        display: none;
    }

    .invoice-content {
        position: relative;
        padding: 56px;
        max-width: 700px;
        width: 100%;
        background-color: #141625;
        color: white;
        box-shadow: 10px 4px 6px -1px rgba(0, 0, 0, 0.2),
            0 2px 4px -1px (0, 0, 0, 0.06);

        h1 {
            margin-bottom: 48px;
            color: white;
        }

        h3 {
            margin-bottom: 16px;
            font-size: 18px;
            color: #777f98;
        }

        h4 {
            color: #7c5dfa;
            font-size: 12px;
            margin-bottom: 24px;
        }

        .bill-from,
        .bill-from {
            margin-bottom: 48px;

            .location-details {
                display: flex;
                gap: 16px;

                div {
                    flex: 1;
                }
            }
        }

        .invoice-work {
            .payment {
                display: flex;
                gap: 24px;
                div {
                    flex: 1;
                }
            }
            .work-items {
                .item-list {
                    width: 100%;

                    .table-heading,
                    .table-items {
                        display: flex;
                        gap: 16px;
                        font-size: 12px;

                        .item-name {
                            flex-basis: 50%;
                        }

                        .quant {
                            flex-basis: 10%;
                        }

                        .price {
                            flex-basis: 20%;
                        }

                        .total {
                            flex-basis: 20%;
                            align-self: center;
                        }
                    }

                    .table-heading {
                        margin-bottom: 16px;

                        th {
                            text-align: left;
                        }
                    }

                    .table-items {
                        position: relative;
                        margin-bottom: 24px;

                        unicon {
                            position: absolute;
                            top: 15px;
                            right: 0px;
                            width: 12px;
                            height: 16px;
                        }
                    }
                }

                .button {
                    color: white;
                    background-color: #252945;
                    align-items: center;
                    justify-content: center;
                    width: 100%;

                    unicon {
                        margin-right: 4px;
                    }
                }
            }
        }
    }

    .footer {
        display: flex;
        margin-top: 60px;

        div {
            flex: 1;
        }

        .right {
            justify-content: flex-end;
        }
    }

    .input {
        margin-bottom: 24px;
    }

    .label {
        font-size: 12px;
        margin-bottom: 6px;
    }

    input,
    select {
        width: 100%;
        background-color: #1e2139;
        color: white;
        border-radius: 4px;
        padding: 12px 4px;
        border: none;

        &:focus {
            outline: none;
        }
    }

    .bill-from,
    .bill-to,
    .input,
    .invoice-work {
        display: flex;
        flex-direction: column;
    }

    .button {
        display: flex;
        align-items: center;
    }
}
</style>
