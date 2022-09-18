<template>
    <div @click="checkClick" ref="invoiceWrap" class="invoice-wrap">
        <form @submit.prevent="handleSubmit" class="invoice-content">
            <h1>New Invoice</h1>

            <div class="bill-from">
                <h4>Bill From</h4>
                <div class="input">
                    <label for="billerStreetAddress">Street Address</label>

                    <input
                        type="text"
                        name="billerStreetAddress"
                        v-model="state.billerStreetAddress"
                    />
                    <span v-if="v$.billerStreetAddress.$error">
                        {{ v$.billerStreetAddress.$errors[0].$message }}</span
                    >
                </div>

                <div class="location-details">
                    <div class="input">
                        <label for="billerCity">City</label>

                        <input
                            type="text"
                            name="billerCity"
                            v-model="state.billerCity"
                        />
                    </div>
                    <div class="input">
                        <label for="billerZipCode">Zip Code</label>

                        <input
                            type="text"
                            name="billerZipCode"
                            v-model="state.billerZipCode"
                        />
                    </div>
                    <div class="input">
                        <label for="billerCountry">Country</label>

                        <input
                            type="text"
                            name="billerCountry"
                            v-model="state.billerCountry"
                        />
                    </div>
                </div>
            </div>

            <div class="bill-to">
                <h4>Bill To</h4>
                <div class="input">
                    <label for="clientName">Client's Name</label>

                    <input
                        type="text"
                        name="clientName"
                        v-model="state.clientName"
                    />
                </div>
                <div class="input">
                    <label for="clientEmail">Client's Email</label>

                    <input
                        type="text"
                        name="clientEmail"
                        v-model="state.clientEmail"
                    />
                </div>
                <div class="input">
                    <label for="clientStreetAddress"
                        >Client's Street Address</label
                    >

                    <input
                        type="text"
                        name="clientStreetAddress"
                        v-model="state.clientStreetAddress"
                    />
                </div>

                <div class="location-details">
                    <div class="input">
                        <label for="clientCity">City</label>

                        <input
                            type="text"
                            name="clientCity"
                            v-model="state.clientCity"
                        />
                    </div>
                    <div class="input">
                        <label for="clientZipCode">Zip Code</label>

                        <input
                            type="text"
                            name="clientZipCode"
                            v-model="state.clientZipCode"
                        />
                    </div>
                    <div class="input">
                        <label for="clientCountry">Country</label>

                        <input
                            type="text"
                            name="clientCountry"
                            v-model="state.clientCountry"
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
                            name="invoiceDate"
                            v-model="state.invoiceDate"
                        />
                    </div>

                    <div class="input">
                        <label for="paymentDueDate">Payment Due</label>
                        <input
                            disabled
                            type="text"
                            name="paymentDueDate"
                            v-model="state.paymentDueDate"
                        />
                    </div>
                </div>
                <div class="input">
                    <label for="paymentTerms">Payment Terms</label>
                    <select
                        type="text"
                        name="paymentTerms"
                        v-model="state.paymentTerms"
                        as="select"
                    >
                        <option value="30">Next 30 Days</option>
                        <option value="60">Next 60 Days</option>
                        <option value="90">Next 90 Days</option>
                    </select>
                </div>
                <div class="input">
                    <label for="productDescription">Product Description</label>
                    <input
                        type="text"
                        name="productDescription"
                        v-model="state.productDescription"
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
                            v-for="item in state.invoiceItemList"
                            :key="item.id"
                        >
                            <td class="item-name">
                                <input type="text" name="item.name" />
                            </td>
                            <td class="quantity">
                                <input type="text" name="item.quantity" />
                            </td>
                            <td class="price">
                                <input type="text" name="item.price" />
                            </td>
                            <td class="total">
                                ${{ (item.total = item.quantity * item.price) }}
                            </td>
                            <unicon
                                class="unicon"
                                @click="deleteInvoiceItem(item.id)"
                                name="trash-alt"
                                fill="white"
                            />
                        </tr>
                    </table>
                    <div @click="addNewInvoiceItem" class="button">
                        <unicon class="unicon" name="plus" fill="white" />
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
                        <input
                            type="submit"
                            class="something dark-purple"
                            value="Save Draft"
                        />
                        <input
                            type="submit"
                            class="something purple"
                            value="Create Invoice"
                        />
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
import { mapMutations } from 'vuex';
import { reactive, computed } from 'vue';
import useValidate from '@vuelidate/core';
import {
    required,
    email,
    minValue,
    maxLength,
    minLength,
} from '@vuelidate/validators';
import { uid } from 'uid';

export default {
    name: 'invoiceModel',
    components: {},

    setup() {
        const state = reactive({
            dateOptions: { year: 'numeric', month: 'short', day: 'numeric' },
            billerStreetAddress: '',
            billerCity: '',
            billerZipCode: '',
            billerCountry: '',
            clientName: '',
            clientEmail: '',
            clientStreetAddress: '',
            clientCity: '',
            clientZipCode: '',
            clientCountry: '',
            invoiceDateUnix: '',
            invoiceDate: '',
            paymentTerms: '',
            paymentDueDate: '',
            paymentDueDateUnix: '',
            productDescription: '',
            invoicePending: '',
            invoiceDraft: '',
            invoiceItemList: [],
            invoiceTotal: 0,
        });

        const rules = computed(() => {
            return {
                billerStreetAddress: {
                    required,
                    minLength: minLength(5),
                    maxLength: maxLength(30),
                },
                billerCity: {
                    required,
                    minLength: minLength(5),
                    maxLength: maxLength(20),
                },
                billerZipCode: {
                    required,
                    minLength: minLength(4),
                    maxLength: maxLength(20),
                },
                billerCountry: {
                    required,
                    minLength: minLength(5),
                    maxLength: maxLength(20),
                },
                clientName: {
                    required,
                    minLength: minLength(3),
                    maxLength: maxLength(20),
                },
                clientEmail: { required, email },
                clientStreetAddress: {
                    required,
                    minLength: minLength(5),
                    maxLength: maxLength(50),
                },
                clientCity: {
                    required,
                    minLength: minLength(5),
                    maxLength: maxLength(20),
                },
                clientZipCode: {
                    required,
                    minLength: minLength(4),
                    maxLength: maxLength(20),
                },
                clientCountry: {
                    required,
                    minLength: minLength(5),
                    maxLength: maxLength(20),
                },
                invoiceDate: { required },
                paymentTerms: { required },
                paymentDueDate: { required },
                productDescription: {
                    required,
                    minLength: minLength(5),
                    maxLength: maxLength(25),
                },
            
                invoiceItemList: {
                    $each: {
                        name: {
                            required,
                            minLength: minLength(3),
                            maxLength: maxLength(15),
                        },
                        quantity: {
                            required,
                            minValue: minValue(0),
                        },
                        price: {
                            required,
                            minValue: minValue(0),
                        },
                    },
                },
            };
        });

        const v$ = useValidate(rules, state);

        return {
            state,
            v$,
        };
    },
    created() {
        this.state.invoiceDateUnix = Date.now();
        this.state.invoiceDate = new Date(
            this.state.invoiceDateUnix
        ).toLocaleDateString('en-us', this.dateOptions);
    },

    methods: {
        ...mapMutations(['TOGGLE_INVOICE']),
        closeInvoice() {
            this.TOGGLE_INVOICE();
        },

        addNewInvoiceItem() {
            this.state.invoiceItemList.push({
                id: uid(),
                name: '',
                quantity: '',
                price: 0,
                total: 0,
            });
        },
        deleteInvoiceItem(id) {
            this.invoiceItemList = this.invoiceItemList.filter(
                (item) => item.id !== id
            );
        },

        publishInvoice() {
            console.log('publishInvoice');
            
            this.state.invoicePending = true;
        },

        saveDraft() {
            console.log('save draft');
            
            this.state.invoiceDraft = true;
        },

        handleSubmit(values) {
          
            this.v$.$validate()
            if (this.v$.$error) {
                console.log(this.v$.$errors);
                return;
            }

            if (values.submitter._value == 'Save Draft') this.saveDraft();
            else if (values.submitter._value == 'Create Invoice')
                this.publishInvoice();
            this.uploadInvoice();
        },

        async uploadInvoice() {},
    },
    watch: {
        'state.paymentTerms': function () {
            const futureDate = new Date();
            this.state.paymentDueDateUnix = futureDate.setDate(
                futureDate.getDate() + parseInt(this.state.paymentTerms)
            );
            console.log(futureDate);
            this.state.paymentDueDate = new Date(
                this.state.paymentDueDateUnix
            ).toLocaleDateString('en-us', this.state.dateOptions);
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

        .bill-to,
        .bill-from {
            margin-bottom: 48px;

            .location-details {
                display: flex;
                flex-wrap: wrap;
                gap: 16px;

                .input {
                    label {
                        min-width: 78px;
                    }
                }

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
                            min-width: 100px;
                            max-width: 240px;
                            flex-basis: 50%;
                        }

                        .quant {
                            min-width: 50px;
                            flex-basis: 10%;
                        }

                        .price {
                            min-width: 50px;
                            flex-basis: 20%;
                        }

                        .total {
                            display: flex;
                            min-width: 50px;
                            flex-basis: 20%;
                            align-self: center;
                        }
                    }

                    .table-heading {
                        margin-bottom: 16px;

                        @media (max-width: 660px) {
                            .item-name {
                                flex-basis: 45%;
                            }
                        }

                        @media (max-width: 630px) {
                            .item-name {
                                flex-basis: 40%;
                            }
                        }

                        @media (max-width: 460px) {
                            .item-name {
                                flex-basis: 33%;
                            }
                        }
                        th {
                            text-align: left;
                        }
                    }

                    .table-items {
                        position: relative;
                        align-items: center;
                        margin-bottom: 24px;

                        .unicon {
                            cursor: pointer;
                        }
                    }
                }

                .button {
                    display: flex;
                    color: white;
                    background-color: #252945;
                    align-items: center;
                    justify-content: center;
                    width: 100%;

                    .unicon {
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
            display: flex;
            justify-content: flex-end;

            .something {
                cursor: pointer;
                padding: 16px 24px;
                border-radius: 30px;
                border: none;
                font-size: 12px;
                margin-right: 8px;
                color: #fff;
            }
        }
    }

    .input {
        display: flex;
        flex-direction: column;
        margin-bottom: 24px;
    }

    .error {
        label {
            color: red;
        }

        input {
            border: 1px solid #cf0202;
        }
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
    .invoice-work {
    }

    @media (min-width: 900px) {
        left: 90px;
    }
}
</style>
