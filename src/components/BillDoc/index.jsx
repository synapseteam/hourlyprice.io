/** @jsxImportSource @emotion/react */
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import BaseInput from "../UI/Input";
import { styles } from "./styles";
import BaseDatePicker from "../UI/DatePicker";
import Button from "../UI/Button";
import PropTypes from "prop-types";

export default function BillDoc({ selectedBill, setBillItems }) {
  const now = new Date();

  useEffect(() => {
    selectedBill && reset(selectedBill);
  }, [selectedBill]);

  const defaultValues = {
    docName: "test1",
    billNumber: "XXXXXX",
    billDateFrom: now,
    billDate: now,
    billAuthor: "XXX XXXXXXXX XXXXXXXXX",
    details: {
      title: "XXX XXXXXXXX XXXXXXXXX",
      price: 100.0,
      quantity: "10:00:00",
      sum: 1000.0,
    },
    total: "Одна тисяча",
    totalCents: "00",
    info: {
      provider: {
        title: "XXX XXXXXXXX XXXXXXXXX",
        field1: "XXX XXXXXXXX XXXXXXXXX",
        field2: "XXX XXXXXXXX XXXXXXXXX",
        field3: "XXX XXXXXXXX XXXXXXXXX",
        field4: "XXX XXXXXXXX XXXXXXXXX",
      },
      buyer: {
        field1: "XXX XXXXXXXX XXXXXXXXX",
        field2: "XXX XXXXXXXX XXXXXXXXX",
      },
    },
  };

  const { register, handleSubmit, reset } = useForm({
    defaultValues: selectedBill ? selectedBill : defaultValues,
  });

  const onSubmit = (data) => {
    const billItems = JSON.parse(localStorage.getItem("billDocs"));

    if (!billItems) {
      setBillItems([data]);
    }
    if (billItems) {
      let index = null;
      const itemExist = billItems.find((item, i) => {
        if (item.docName === data.docName) index = i;
        return item.docName === data.docName;
      });
      if (!itemExist) {
        billItems.push(data);
        setBillItems(billItems);
      }
      if (itemExist) {
        billItems[index] = data;

        setBillItems(billItems);
        console.log("item updated");
      }
    }
  };
  return (
    <form css={styles.billDoc} onSubmit={handleSubmit(onSubmit)}>
      <div css={styles.save}>
        <BaseInput register={register} inputName="docName" width="200" />
        <div>
          <Button
            classname={styles.saveButton}
            classnameContainer={styles.saveButtonContainer}
            type="submit"
          >
            Зберегти
          </Button>
        </div>
      </div>
      <div css={styles.title}>
        Рахунок-фактура №22-
        <BaseInput
          register={register}
          inputName="billNumber"
          width="80"
          classname={styles.titleFieldBold}
        />
        від{" "}
        <BaseDatePicker
          register={register}
          inputName="billDateFrom"
          classname={styles.titleFieldBold}
          dateFormat="dd.MM.yyyy"
        />
      </div>
      <div css={styles.infoContainer}>
        <div css={styles.info}>
          <div css={styles.infoTitle}>
            <span>Постачальник</span>
          </div>
          <div css={styles.infoContent}>
            <div css={styles.infoTitleInput}>
              <BaseInput
                register={register}
                inputName="info.provider.title"
                width="250"
                classname={styles.fieldBold}
              />
            </div>
            <BaseInput
              register={register}
              inputName="info.provider.field1"
              width="250"
            />
            <BaseInput
              register={register}
              inputName="info.provider.field2"
              width="250"
            />
            <BaseInput
              register={register}
              inputName="info.provider.field3"
              width="250"
            />
            <BaseInput
              register={register}
              inputName="info.provider.field4"
              width="250"
            />
          </div>
        </div>
        <div css={styles.info}>
          <div css={styles.infoTitle}>
            <span>Покупець</span>
          </div>
          <div css={styles.infoContent}>
            <BaseInput
              register={register}
              inputName="info.buyer.field1"
              width="250"
            />
            <BaseInput
              register={register}
              inputName="info.buyer.field2"
              width="250"
            />
          </div>
        </div>
      </div>
      <div css={styles.basis}>
        <span>Підстава:</span>
        <div css={styles.details}>
          <div css={styles.fieldBold}>№</div>
          <div css={styles.fieldBold}>Найменування</div>
          <div css={styles.fieldBold}>Од. вим.</div>
          <div css={styles.fieldBold}>Кількість</div>
          <div css={styles.fieldBold}>Ціна, грн.</div>
          <div css={styles.fieldBold}>Сума, грн.</div>
          <div css={styles.fieldBold}>1</div>
          <div>
            <BaseInput
              register={register}
              inputName="details.title"
              width="210"
              classname={styles.fieldBold}
            />
          </div>
          <div css={styles.fieldBold}>Година</div>
          <div>
            <BaseInput
              register={register}
              inputName="details.quantity"
              width="70"
              classname={styles.fieldBold}
            />
          </div>
          <div>
            <BaseInput
              register={register}
              inputName="details.price"
              width="70"
              classname={styles.fieldBold}
            />
          </div>
          <div>
            <BaseInput
              register={register}
              inputName="details.sum"
              width="80"
              classname={styles.fieldBold}
            />
          </div>
        </div>
        <div css={styles.total}>
          <div>
            <span css={styles.fieldBold}>1000,00 грн.</span>
          </div>
          <div>
            <span css={styles.totalColumn}>ПДВ:</span>
            <span css={styles.fieldBold}>без ПДВ</span>
          </div>
        </div>
      </div>
      <div>
        <div css={styles.totalText}>
          <span>До сплати:</span>
          <BaseInput
            register={register}
            inputName="total"
            width="90"
            classname={styles.fieldBold}
          />
          <span>гривень</span>
          <BaseInput
            register={register}
            inputName="totalCents"
            width="10"
            classname={styles.fieldBold}
          />
          <span>копійок, без ПДВ</span>
        </div>
      </div>

      <div css={styles.billAuthor}>
        <div css={styles.billAuthorTitle}>
          <span css={styles.fieldBold}>Рахунок виписав (ла)</span>
        </div>
        <BaseInput
          register={register}
          inputName="billAuthor"
          width="300"
          classname={styles.fieldBold}
        />
      </div>
    </form>
  );
}

BillDoc.propTypes = {
  selectedBill: PropTypes.object,
  setBillItems: PropTypes.func,
};
