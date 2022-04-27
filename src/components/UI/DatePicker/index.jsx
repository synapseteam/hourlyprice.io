/** @jsxImportSource @emotion/react */
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import uk from "date-fns/locale/uk";
import {css, Global} from "@emotion/react";
import PropTypes from "prop-types";
import {useState} from "react";

import {styles} from "./styles";

export default function BaseDatePicker({register, inputName, dateFormat, classname}) {
    const now = new Date();
    const [startDate, setStartDate] = useState(now);

    return (
        <>
            <Global
                styles={css`
                  .react-datepicker-wrapper {
                    width: auto;
                    text-indent: 0px;

                    input {
                      width: 150px;
                    }
                  }
                `}
            />
            <DatePicker
                css={[styles.fieldDate, classname]}
                locale={uk}
                selected={startDate}
                dateFormat={dateFormat}
                {...register(inputName)}
                onChange={(date) => setStartDate(date)}
            />
        </>
    );
}

BaseDatePicker.defaultProps = {
    dateFormat: "dd MMMM yyyy",
};

BaseDatePicker.propTypes = {
    register: PropTypes.func,
    inputName: PropTypes.string,
    dateFormat: PropTypes.string,
    classname: PropTypes.any,
};
