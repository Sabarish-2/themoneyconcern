import React, { useState } from 'react';
import { Form } from 'react-bootstrap';

interface FormGrpProps {
    label: string;
    defaultValue?: number;
    id: string;
    onChange: (value: number, isYearly: boolean) => void;
    rlabel1?: string;
    rlabel2?: string;
}

const FormGroup = ({ label, defaultValue, id, onChange, rlabel1, rlabel2} : FormGrpProps) => {
    const [isSecond, setIsSecond] = useState<boolean>(false);

    return (
        <Form.Group>
            <Form.Label className="m-3">{label}</Form.Label>
            <div>
                <input
                    type="number"
                    placeholder={label}
                    id={id}
                    defaultValue={defaultValue?.toString()}
                    onChange={(e) => onChange(parseFloat(e.target.value), isSecond)}
                />
                {rlabel1 && (
                    <label className="m-3">
                        <input
                            type="radio"
                            name={id}
                            // value="0"
                            checked={!isSecond}
                            onChange={(e) => {
                                setIsSecond(false)
                                onChange(parseFloat(e.target.value), isSecond)
                            }}
                            />
                        {rlabel1}
                    </label>
                )}
                {rlabel2 && (
                    <label className="m-3">
                        <input
                            type="radio"
                            name={id}
                            // value="1"
                            checked={isSecond}
                            onChange={(e) => {
                                setIsSecond(true)
                                onChange(parseFloat(e.target.value), isSecond)
                        }}
                        />
                        {rlabel2}
                    </label>
                )}
            </div>
        </Form.Group>
    );
};

export default FormGroup;