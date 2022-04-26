/** @jsxImportSource @emotion/react */
import { useForm } from "react-hook-form";
import BaseDatePicker from "../UI/DatePicker/index";
import BaseInput from "../UI/Input/index";
import Button from "components/UI/Button";
import { styles } from "./styles";

export default function ActOfWorkDoc() {
  const now = new Date();

  const defaultValues = {
    docName: "test1",
    actNumber: "22-1904_6125",
    actDateNumber: "2_17-02/2022",
    actDateTo: now,
    actDate: now,
    clientСompany: "«СІНАПС ТІМ»",
    clientСompanyDirector: "Барботкіна Романа Романовича",
    details: {
      title: "Послуги веб розробки: React та налаштування компонентів",
      units: "Година",
      price: 10.5,
      quantity: "10:00",
      priceWithoutTax: "105",
    },
    total: "105",
    cost: "105 (сто п'ять грн. 00 коп.)",
    info: {
      client: {
        name: "ТОВАРИСТВО З ОБЗЕЖЕНОЮ ВІДПОВІДАЛЬНІСТЮ «СІНАПС ТІМ»",
        address:
          "Україна, 69091, Запорізька обл., місто Запоріжжя, вул. Дунайська, буд.35",
        reg: "42772269",
        email: "roman@synapseteam.com",
        tel: "+380992688071",
        bank: "ЗАПОРІЗЬКЕ РУ АТ КБ 'ПРИВІТБАНК'",
        account: "UA913133990000026001055756583",
        initials: "Р.Р. Барботкін",
      },
      executor: {
        name: "Іван Іванович Тест",
        reg: "1122334455",
        email: "test@synapseteam.com",
        tel: "+38068111111",
        bank: "AT Super Банк",
        account: "UA11111111111111111111111",
        initials: "І.І. Тест",
      },
    },
  };

  const { register, handleSubmit } = useForm({
    defaultValues,
  });

  const onSubmit = (data) => {
    const actOfWork = JSON.parse(localStorage.getItem("actOfWorkDocs"));

    if (!actOfWork) {
      localStorage.setItem("actOfWorkDocs", JSON.stringify([data]));
    }
    if (actOfWork) {
      const itemExist = actOfWork.find((item) => {
        return item.docName === data.docName;
      });
      if (!itemExist) {
        actOfWork.push(data);
        localStorage.setItem("actOfWorkDocs", JSON.stringify(actOfWork));
      }
      if (itemExist) {
        console.log("item exists");
      }
    }
  };
  return (
    <form css={styles.actOfWork} onSubmit={handleSubmit(onSubmit)}>
      <div css={styles.save}>
        <BaseInput register={register} inputName="docName" />
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
        Акт приймання-передачі №
        <BaseInput register={register} inputName="actNumber" width="95" />
        наданих послуг до договору
        <br />
        №
        <BaseInput register={register} inputName="actDateNumber" width="95" />
        від <BaseDatePicker register={register} inputName="actDateFrom" />
      </div>
      <div css={styles.subtitle}>
        <div>м. Запоріжжя</div>
        <div>
          <BaseDatePicker
            register={register}
            inputName="actDateFrom"
            dateFormat="«dd» MMMM yyyy року"
          />
        </div>
      </div>
      <div css={styles.paragraphs}>
        ТОВАРИСТВО З ОБМЕЖЕНОЮ ВІДПОВІДАЛЬНІСТЮ
        <BaseInput type="text" register={register} inputName="clientСompany" />
        , Україна, в особі директора
        <BaseInput register={register} inputName="clientСompanyDirector" />,
        який діє на підставі Статуту, (надалі - “Замовник”) що діє від імені
        Замовника, з одного боку, та
        <br />
        Фізична особа-підприємець
        <BaseInput register={register} inputName="info.executor.name" />{" "}
        реєстраційний номер облікової картки платника податків
        <BaseInput register={register} inputName="info.executor.reg" /> (надалі
        “Виконавець”), з іншого боку, підписали цей акт приймання-передачі
        наданих послуг по Договору №
        <BaseInput register={register} inputName="actDateNumber" />
        <BaseDatePicker register={register} inputName="actDateFrom" /> про
        наступне:
        <div css={styles.paragraphs}>
          Виконавець здав, а Замовник прийняв послуги по розробці програмного
          забезпечення в наступній кількості та вартості:
        </div>
      </div>
      <div css={styles.details}>
        <div css={styles.heading}>
          <span css={styles.column1}>№</span>
          <span css={styles.column2}>Найменування</span>
          <span css={styles.column3}>Од. вим.</span>
          <span css={styles.column4}>Ціна, грн.,без ПДВ</span>
          <span css={styles.column5}>Кількість</span>
          <span css={styles.column6}>Вартість, грн., без ПДВ</span>
        </div>
        <div css={styles.heading}>
          <span css={styles.column1}>1</span>
          <span css={styles.column2}>
            <textarea
              css={[styles.fieldBold, styles.textarea]}
              maxLength={100}
              {...register("details.title")}
            />
          </span>
          <span css={styles.column3}>
            <BaseInput
              classname={styles.fieldBold}
              register={register}
              inputName="details.units"
            />
          </span>
          <span css={styles.column4}>
            <BaseInput
              classname={styles.fieldBold}
              register={register}
              inputName="details.price"
            />
          </span>
          <span css={styles.column5}>
            <BaseInput
              classname={styles.fieldBold}
              register={register}
              inputName="details.quantity"
            />
          </span>
          <span css={styles.column6}>
            <BaseInput
              register={register}
              classname={styles.fieldBold}
              inputName="details.priceWithoutTax"
            />
          </span>
        </div>

        <div css={styles.total}>
          <span css={styles.fieldBold}>111</span>
        </div>
      </div>
      <div css={[styles.paragraphs, styles.fieldBold]}>
        Загальна вартість наданих послуг складає
        <BaseInput
          register={register}
          classname={styles.fieldBold}
          inputName="cost"
        />
        , без ПДВ.
        <div css={styles.paragraphs}>
          Послуги надані вчасно та повному об’ємі. Сторони не мають претензій
          одна до одної з приводу якості наданих послуг.
        </div>
      </div>
      <div css={styles.info}>
        <div css={styles.item}>
          <div>
            <div css={styles.fieldBold}>Замовник</div>
            <BaseInput
              register={register}
              classname={[styles.fieldBold, styles.infoTitleInput]}
              inputName="info.client.name"
            />
          </div>
          <div>
            <div>
              <span css={styles.fieldBold}>Адреса:</span>
              <BaseInput register={register} inputName="info.client.address" />
            </div>
          </div>
          <div>
            <span css={styles.fieldBold}>ЄДРПОУ:</span>
            <BaseInput
              register={register}
              classname={styles.fieldBold}
              inputName="info.client.reg"
            />
          </div>
          <div>
            <span css={styles.fieldBold}>E-mail:</span>
            <BaseInput
              register={register}
              classname={styles.fieldBold}
              inputName="info.client.email"
            />
          </div>
          <div>
            <span css={styles.fieldBold}>Телефон:</span>
            <BaseInput register={register} inputName="info.client.tel" />
          </div>
          <div>
            <span css={styles.fieldBold}>Назва банку:</span>
            <BaseInput register={register} inputName="info.client.bank" />
          </div>
          <div>
            <span css={styles.fieldBold}>Рахунок:</span>
            <BaseInput register={register} inputName="info.client.account" />
          </div>
          <div css={styles.initials}>
            <span css={styles.fieldBold}>_______________</span>
            <BaseInput
              register={register}
              classname={styles.fieldBold}
              inputName="info.client.initials"
            />
          </div>
        </div>
        <div css={styles.item}>
          <div css={styles.fieldBold}>Виконавець</div>
          <BaseInput
            register={register}
            classname={[styles.fieldBold, styles.infoTitleInput]}
            inputName="info.executor.name"
          />
          <div>
            <span css={styles.fieldBold}>Адреса:</span>
            <BaseInput register={register} inputName="info.client.address" />
          </div>
          <div>
            <span css={styles.fieldBold}>
              Реєстраційний номер облікової картки платника податків:
            </span>
            <BaseInput register={register} inputName="info.executor.reg" />
          </div>
          <div>
            <span css={styles.fieldBold}>E-mail:</span>
            <BaseInput register={register} inputName="info.executor.email" />
          </div>
          <div>
            <span css={styles.fieldBold}>Телефон:</span>
            <BaseInput register={register} inputName="info.executor.tel" />
          </div>
          <div>
            <span css={styles.fieldBold}>Назва банку:</span>
            <BaseInput register={register} inputName="info.executor.tel" />
          </div>
          <div>
            <span css={styles.fieldBold}>Рахунок:</span>
            <BaseInput register={register} inputName="info.executor.account" />
          </div>
          <div css={styles.initials}>
            <span css={styles.fieldBold}>_______________</span>
            <BaseInput
              register={register}
              classname={styles.fieldBold}
              inputName="info.executor.initials"
            />
          </div>
        </div>
      </div>
    </form>
  );
}
