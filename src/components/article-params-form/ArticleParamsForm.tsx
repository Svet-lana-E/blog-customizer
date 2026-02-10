import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { useRef, useState } from 'react';
import clsx from 'clsx';
import { Text } from 'src/ui/text';
import styles from './ArticleParamsForm.module.scss';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
} from 'src/constants/articleProps';

type FormProps = {
	formState: ArticleStateType;
	setFormState: (option: ArticleStateType) => void;
};

export const ArticleParamsForm = ({ formState, setFormState }: FormProps) => {
	const [isParamFormOpen, setParamFormIsOpen] = useState(false);
	const asideClassName = clsx({
		[styles.container]: true,
		[styles.container_open]: isParamFormOpen,
	});
	const rootRef = useRef<HTMLDivElement>(null);

	const [currentFormState, setCurrentFormState] = useState(formState);

	const handleChange = (key: keyof ArticleStateType, value: OptionType) => {
		setCurrentFormState({ ...currentFormState, [key]: value });
	};

	useOutsideClickClose({
		isOpen: isParamFormOpen,
		rootRef: rootRef,
		onClose: () => setParamFormIsOpen(false),
		onChange: setParamFormIsOpen,
	});

	return (
		<>
			<ArrowButton
				isOpen={isParamFormOpen}
				onClick={() => {
					setParamFormIsOpen(!isParamFormOpen);
				}}
			/>
			<aside ref={rootRef} className={asideClassName}>
				<form
					className={styles.form}
					onSubmit={(e) => {
						e.preventDefault();
						setFormState(currentFormState);
						setParamFormIsOpen(false);
					}}
					onReset={(e) => {
						e.preventDefault();
						setFormState(defaultArticleState);
						setCurrentFormState(defaultArticleState);
					}}>
					<Text as='h2' size={31} weight={800} uppercase>
						задайте параметры
					</Text>
					<Select
						title='шрифт'
						selected={currentFormState.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={(option) =>
							handleChange('fontFamilyOption', option)
						}></Select>
					<RadioGroup
						title={'размер шрифта'}
						options={fontSizeOptions}
						selected={currentFormState.fontSizeOption}
						onChange={(option) => handleChange('fontSizeOption', option)}
						name={'font-size'}></RadioGroup>
					<Select
						title='цвет шрифта'
						selected={currentFormState.fontColor}
						options={fontColors}
						onChange={(option) => handleChange('fontColor', option)}></Select>
					<Separator />
					<Select
						title='цвет фона'
						selected={currentFormState.backgroundColor}
						options={backgroundColors}
						onChange={(option) =>
							handleChange('backgroundColor', option)
						}></Select>
					<Select
						title='ширина контента'
						selected={currentFormState.contentWidth}
						options={contentWidthArr}
						onChange={(option) =>
							handleChange('contentWidth', option)
						}></Select>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
