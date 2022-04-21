/** @jsxImportSource @emotion/react */
// import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { styles } from "./styles";

export default function ActOfWorkDoc() {
  // const now = new Date();

  // const defaultValues = {
  //   actNumber: "№22-1904_6125",
  //   actDateFrom: now,
  //   actDateTo: now,
  //   actDate: now,
  //   clientСompany: "СІНАПС ТІМ",
  //   clientСompanyDirector: "Барботкіна Романа Романовича",
  //   executor: "Іван Іванович Тест",
  //   details: {
  //     title: "Послуги веб розробки: React та налаштування компонентів",
  //     units: "Година",
  //     price: 10.5,
  //     quantity: "10:00",
  //     priceWithoutTax: "105",
  //   },
  //   total: "105",
  //   cost: "105 (сто п'ять грн. 00 коп.)",
  //   info: {
  //     client: {
  //       name: "ТОВАРИСТВО З ОБЗЕЖЕНОЮ ВІДПОВІДАЛЬНІСТЮ «СІНАПС ТІМ»",
  //       address:
  //         "Україна, 69091, Запорізька обл., місто Запоріжжя, вул. Дунайська, буд.35",
  //       reg: "42772269",
  //       email: "raman@synapseteam.com",
  //       tel: "+380992688071",
  //       bank: "ЗАПОРІЗЬКЕ РУ АТ КБ 'ПРИВІТБАНК'",
  //       account: "UA913133990000026001055756583",
  //       initials: "Р.Р. Барботкін",
  //     },
  //     executor: {
  //       name: "test",
  //       reg: "test",
  //       email: "test@synapseteam.com",
  //       tel: "+38068111111",
  //       bank: "AT Super Банк",
  //       account: "UA11111111111111111111111",
  //     },
  //   },
  // };

  // const { register, control, getValues, setValue, watch } = useForm({
  //   defaultValues,
  // });

  return (
    <form>
      <div css={styles.actOfWork}>
        <div>
          <p>
            Акт приймання-передачі № <input /> наданих послуг до договору <br />
            № <DatePicker /> від <DatePicker />
          </p>
        </div>
        <div css={styles.subtitle}>
          <span>м. Запоріжжя</span>
          <DatePicker />
        </div>
        <div>
          <p>
            ТОВАРИСТВО З ОБЗЕЖЕНОЮ ВІДПОВІДАЛЬНІСТЮ <input type="text" />,
            Україна, в особі директора <input type="text" /> який діє на
            підставі Статуту, (надалі - “Замовник”) що діє від імені Замовника,
            з одного боку, та <br />
            Фізична особа-підприємець <input type="text" /> реєстраційний номер
            облікової картки платника податків <input type="text" /> (надалі
            “Виконавець”), з іншого боку, підписали цей акт приймання-передачі
            наданих послуг по Договору № <input type="text" /> <DatePicker />
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio
            fugiat dolores similique quod, minus quisquam iure dolore fuga
            tenetur quidem dicta quaerat ducimus! Maiores, saepe. Voluptatibus
            hic neque soluta repudiandae.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio
            fugiat dolores similique quod
          </p>
        </div>
        <div css={styles.details}>
          <div css={styles.heading}>
            <span css={styles.headingColumn1}>№</span>
            <span css={styles.headingColumn2}>Найменування</span>
            <span css={styles.headingColumn3}>Од. вим.</span>
            <span css={styles.headingColumn4}>Ціна, грн.,без ПДВ</span>
            <span css={styles.headingColumn5}>Кількість</span>
            <span css={styles.headingColumn6}>Вартість, грн., без ПДВ</span>
          </div>
          <div>
            <span> </span>
          </div>
          <div>
            <span>Total:111</span>
          </div>
        </div>
        <div>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
          <p>
            Nihil tenetur quidem laboriosam quis. Sapiente ex sequi fugit
            reiciendis, labore quidem nemo aut officiis sint necessitatibus
            deleniti doloremque est aspernatur quas.
          </p>
        </div>
        <div css={styles.info}>
          <div>
            <span>Lorem</span>
            <span>ipsum dolor sit amet consectetur adipisicing elit.</span>
            <span>
              Iste molestiae, ullam enim ipsa, sapiente laborum dignissimos est
              ex et veritatis eveniet quam unde ut, distinctio maxime laboriosam
              nulla vel necessitatibus?
            </span>
          </div>
          <div>
            <span>Lorem</span>
            <span>ipsum dolor sit amet consectetur adipisicing elit.</span>
            <span>
              Iste molestiae, ullam enim ipsa, sapiente laborum dignissimos est
              ex et veritatis eveniet quam unde ut, distinctio maxime laboriosam
              nulla vel necessitatibus?
            </span>
          </div>
        </div>
      </div>
    </form>
  );
}
