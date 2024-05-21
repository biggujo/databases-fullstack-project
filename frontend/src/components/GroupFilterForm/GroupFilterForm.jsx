import React from 'react';
import { FormikProvider } from 'formik';
import {
  Button, Flex, FormControl, FormLabel, Input, Select,
} from '@chakra-ui/react';
import useGroupFilter from '../../hooks/useGroupFilter.js';
import { GroupTasksOperations } from '../../redux/groupTasks/operations.js';
import { GroupsOperations } from '../../redux/groups/operations.js';
import { useTranslation } from 'react-i18next';

export default function GroupFilterForm() {
  const formik = useGroupFilter({ operations: GroupsOperations });
  const { t } = useTranslation();

  return (<FormikProvider value={formik}>
    <Flex as={'form'}
          gap={4}
          direction={'column'}
          onSubmit={(event) => {
            event.preventDefault();
            formik.handleSubmit();
          }}>
      <Flex gap={4}>
        <FormControl>
          <FormLabel>
            <Flex gap={2}>
              <span>{t('name')}</span>
            </Flex>
          </FormLabel>
          <Input
            name="name"
            type="text"
            bgColor={'white'}
            fontSize={'14'}
            height={9}
            placeholder={t('groupNamePlaceholder')}
            autoComplete={'off'}
            value={formik.values.name}
            onChange={formik.handleChange}
          />
        </FormControl>
        <FormControl>
          <FormLabel>
            <Flex gap={2}>
              <span>{t('membersMoreThan')}</span>
            </Flex>
          </FormLabel>
          <Input
            name="members"
            type="number"
            min={0}
            bgColor={'white'}
            fontSize={'14'}
            height={9}
            value={formik.values.members}
            onChange={formik.handleChange}
          />
        </FormControl>
        <FormControl>
          <FormLabel>
            <Flex gap={2}>
              <span>{t('sortName')}</span>
            </Flex>
          </FormLabel>
          <Select
            name={'order'}
            fontSize={'14'}
            height={9}
            onChange={(e) => {
              formik.setFieldValue('order', e.target.value);
            }}
          >
            <option value={'asc'}>{t('byAscending')}</option>
            <option value={'desc'}>{t('byDescending')}</option>
          </Select>
        </FormControl>
      </Flex>
      <Flex gap={4}>
        <Button type={'submit'}
                alignSelf={'start'}
                bg="purple.500"
                color="white"
                _hover={{ bg: 'purple.800' }}>
          {t('search')}
        </Button>
        <Button onClick={() => {
          formik.resetForm();
          formik.submitForm();
        }}>{t('clear')}</Button>
      </Flex>
    </Flex>
  </FormikProvider>);
}
