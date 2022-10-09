import React, { useEffect, useState } from "react";
import Language from "../../../models/configuration/language/Language";
import BaseService from "../../../service/BaseService";
import { Form, Select } from "antd";
import { useTranslation } from "react-i18next";
import Dynamic from "../../../service/base/Dynamic";
const service = new BaseService();

type FormLanguageSelectProp =  {
    defaultValue : number
    onChange : any
    show : boolean
}


const FormLanguageSelect: React.FC<FormLanguageSelectProp> = (props : FormLanguageSelectProp) => {
  const [languages, setLanguages] = useState<Language[]>([]);
  const {t} = useTranslation()
  useEffect(() => {
    const getLanguages = async () => {
      try {
        const filter = new Language()
        const dynamic = new Dynamic()
        dynamic.pageSize = 10
        const { data } = await service.Configuration.getLanguages(filter,dynamic);
        if (!data.hasFailed) {
          setLanguages(data.data.items);
        }
      } catch (error) {}
    };
    getLanguages();
  }, []);

  if(props.show){
    return (
        <Form.Item
          name="languageID"
          label={t("LanguageID")}
          rules={[{ required: true }]}
        >
          <Select onChange={props.onChange} defaultValue={props.defaultValue}>
            {languages.map((language) => (
              <Select.Option key={language.id} value={language.id}>
                {language.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      );
  }
  return <></> 
};

export default FormLanguageSelect;
