import React, { useState, useEffect } from 'react';
import { Table, Input, Button } from '@chakra-ui/react';
import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react';
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import HandleAddExpense from '../functions/HandleAddExpense.jsx'


function ExpenseInput() {
  const [expenseName, setExpenseName] = useState('');
  const [category, setCategory] = useState('');
  const [dateTime, setDateTime] = useState('');
  const [amount, setAmount] = useState(0);
  const [memo, setMemo] = useState('');

  const [categoryOptions, setCategoryOptions] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost/ExpenseTracker/database/api/category/read.php');
        const categoryData = await response.json();
        setCategoryOptions(categoryData);
      } catch (error) {
        console.error('Error fetching category data:', error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <>
      <Table>Expense Tracker</Table>
      <Input
        placeholder='Expense Name'
        value={expenseName}
        onChange={(e) => setExpenseName(e.target.value)}           
      />

      <Menu>
        <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
          Category
        </MenuButton>
        <MenuList>
          {categoryOptions.map((categoryOption) => (
            <MenuItem
              key={categoryOption.catID}
              onClick={() => setCategory(categoryOption.catID)}
              style={{ backgroundColor: categoryOption.color }}
            >
              {categoryOption.name}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>

      <Input
        placeholder="Select Date and Time"
        size="md"
        type="date"
        onChange={(e) => setDateTime(e.target.value)}
      />
      <NumberInput defaultValue={0} precision={2} step={10} min={0}>
        <NumberInputField
          value={amount}
          onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
        />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>

      <Input
        placeholder='Memo'
        value={memo}
        onChange={(e) => setMemo(e.target.value)}
      />
      <Button colorScheme='blue' onClick={() => HandleAddExpense(expenseName, category, dateTime, amount, memo)}>
        Add Expense
      </Button>
    </>
  );
}

export default ExpenseInput;