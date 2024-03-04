import React, { useState } from 'react';
import { Form } from 'react-bootstrap';

interface FormGrpProps {
    label: string;
    defaultValue?: number;
    id: string;
    onChange: (value: number, isYearly: boolean) => void;
    rlabel1?: string;
    rlabel2?: string;
    isSecond?: boolean;
}

const FormGroup = ({ label, defaultValue, id, onChange, rlabel1, rlabel2, isSecond} : FormGrpProps) => {
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
                                isSecond = false
                                onChange(parseFloat(e.target.value) || defaultValue, isSecond)
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
                                isSecond = true
                                onChange(parseFloat(e.target.value) || defaultValue, isSecond)
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