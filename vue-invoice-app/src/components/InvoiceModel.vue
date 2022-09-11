<template>
    <div @click="checkClick" ref="invoiceWrap" class="invoice-wrap">
        <Form
            @submit="handleSubmit"
            :validation-schema="newInvoiceSchema"
            v-slot="{ errors }"
            :initial-values="formValues"
            class="invoice-content"
        >
            <h1>New Invoice</h1>

            <div class="bill-from">
                <h4>Bill From</h4>
                <div
                    v-bind:class="`input ${
                        errors.billerStreetAddress ? 'error' : ''
                    }`"
                >
                    <label for="billerStreetAddress">Street Address</label>

                    <Field
                        type="text"
                        id="billerStreetAddress"
                        name="billerStreetAddress"
                    />
                </div>

                <div class="location-details">
                    <div
                        v-bind:class="`input ${
                            errors.billerCity ? 'error' : ''
                        }`"
                    >
                        <label for="billerCity">City</label>

                        <Field type="text" id="billerCity" name="billerCity" />
                    </div>
                    <div
                        v-bind:class="`input ${
                            errors.billerZipCode ? 'error' : ''
                        }`"
                    >
                        <label for="billerZipCode">Zip Code</label>

                        <Field
                            type="text"
                            id="billerZipCode"
                            name="billerZipCode"
                        />
                    </div>
                    <div
                        v-bind:class="`input ${
                            errors.billerCountry ? 'error' : ''
                        }`"
                    >
                        <label for="billerCountry">Country</label>

                        <Field
                            type="text"
                            id="billerCountry"
                            name="billerCountry"
                        />
                    </div>
                </div>
            </div>

            <div class="bill-to">
                <h4>Bill To</h4>
                <div
                    v-bind:class="`input ${
                        errors.clientName ? 'error' : ''
                    }`"
                >
                    <label for="clientName">Client's Name</label>

                    <Field type="text" id="clientName" name="clientName" />
                </div>
                <div
                    v-bind:class="`input ${
                        errors.clientEmail ? 'error' : ''
                    }`"
                >
                    <label for="clientEmail">Client's Email</label>

                    <Field type="text" id="clientEmail" name="clientEmail" />
                </div>
                <div
                    v-bind:class="`input ${
                        errors.clientStreetAddress ? 'error' : ''
                    }`"
                >
                    <label for="clientStreetAddress"
                        >Client's Street Address</label
                    >

                    <Field
                        type="text"
                        id="clientStreetAddress"
                        name="clientStreetAddress"
                    />
                </div>

                <div class="location-details">
                    <div
                        v-bind:class="`input ${
                            errors.clientCity ? 'error' : ''
                        }`"
                    >
                        <label for="clientCity">City</label>

                        <Field type="text" id="clientCity" name="clientCity" />
                    </div>
                    <div
                        v-bind:class="`input ${
                            errors.clientZipCode ? 'error' : ''
                        }`"
                    >
                        <label for="clientZipCode">Zip Code</label>

                        <Field
                            type="text"
                            id="clientZipCode"
                            name="clientZipCode"
                        />
                    </div>
                    <div
                        v-bind:class="`input ${
                            errors.clientCountry ? 'error' : ''
                        }`"
                    >
                        <label for="clientCountry">Country</label>

                        <Field
                            type="text"
                            id="clientCountry"
                            name="clientCountry"
                        />
                    </div>
                </div>
            </div>

            <div class="invoice-work">
                <div class="payment">
                    <div
                        v-bind:class="`input ${
                            errors.invoiceDate ? 'error' : ''
                        }`"
                    >
                        <label for="invoiceDate">Invoice Date</label>

                        <Field
                            disabled
                            type="text"
                            id="invoiceDate"
                            name="invoiceDate"
                        />
                    </div>

                    <div
                        v-bind:class="`input ${
                            errors.paymentDueDate ? 'error' : ''
                        }`"
                    >
                        <label for="paymentDueDate">Payment Due</label>
                        <Field
                            disabled
                            type="text"
                            id="paymentDueDate"
                            name="paymentDueDate"
                        />
                    </div>
                </div>
                <div
                    v-bind:class="`input ${
                        errors.paymentTerms ? 'error' : ''
                    }`"
                >
                    <label for="paymentTerms">Payment Terms</label>
                    <select
                        type="text"
                        id="paymentTerms"
                        name="paymentTerms"
                        as="select"
                    >
                        <option value="30">Net 30 Days</option>
                        <option value="60">Net 60 Days</option>
                        <option value="90">Net 90 Days</option>
                    </select>
                </div>
                <div
                    v-bind:class="`input ${
                        errors.productDescription ? 'error' : ''
                    }`"
                >
                    <label for="productDescription">Product Description</label>
                    <Field
                        type="text"
                        id="productDescription"
                        name="productDescription"
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
                            v-for="(item, index) in invoiceItemList"
                            :key="index"
                        >
                            <td class="item-name">
                                <Field type="text" name="item.itemName" />
                            </td>
                            <td class="quant">
                                <Field type="text" name="item.quant" />
                            </td>
                            <td class="price">
                                <Field type="text" name="item.price" />
                            </td>
                            <td class="total">
                                ${{ (item.total = item.quant * item.price) }}
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
        </Form>
    </div>
</template>

<script>
import { mapMutations } from 'vuex';
import { Form, Field } from 'vee-validate';
import { uid } from 'uid';
import { object } from 'yup';
import { rules } from '../utils/yup.util';

const newInvoiceSchema = object({
    billerStreetAddress: rules.street.required(),
    billerCity: rules.city.required(),
    billerZipCode: rules.zipCode.required(),
    billerCountry: rules.country.required(),
    clientName: rules.name.required(),
    clientEmail: rules.email.required(),
    clientStreetAddress: rules.street.required(),
    clientZipCode: rules.zipCode.required(),
    clientCountry: rules.country.required(),
    invoiceDate: rules.date.required(),
    paymentDueDate: rules.date.required(),
    productDescription: rules.description.required(),
});

export default {
    name: 'invoiceModel',
    components: {
        Form,
        Field,
    },
    data() {
        return {
            newInvoiceSchema: newInvoiceSchema,
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

        addNewInvoiceItem() {
            this.invoiceItemList.push({
                id: uid(),
                itemName: '',
                quant: '',
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
            this.invoicePending = true;
        },

        saveDraft() {
            this.invoiceDraft = true;
        },

        handleSubmit(values, actions) {
            console.log(actions);
            console.log(values);
            this.uploadInvoice();
        },

        async uploadInvoice() {},
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
