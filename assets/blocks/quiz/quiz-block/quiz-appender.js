/**
 * WordPress dependencies
 */
import { createBlock } from '@wordpress/blocks';
import { useDispatch } from '@wordpress/data';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import quizIcon from '../../../icons/quiz-icon';
import questionBlock from '../question-block';
import categoryQuestionBlock from '../category-question-block';
import { useNextQuestionIndex } from './next-question-index';
import TextAppender from '../../../shared/components/text-appender';

/**
 * Quiz block inserter for adding new or existing questions.
 *
 * @param {Object}   props
 * @param {string}   props.clientId  Quiz block ID.
 * @param {Function} props.openModal Open modal callback.
 */
const QuizAppender = ( { clientId, openModal } ) => {
	const { insertBlock } = useDispatch( 'core/block-editor' );
	const nextInsertIndex = useNextQuestionIndex( clientId );

	const addNewQuestionBlock = ( block ) => {
		insertBlock(
			createBlock( block.name ),
			nextInsertIndex,
			clientId,
			true
		);
	};

	const controls = [
		{
			title: __( 'New Question', 'sensei-lms' ),
			icon: questionBlock.icon,
			onClick: () => addNewQuestionBlock( questionBlock ),
		},
		{
			title: __( 'Category Question(s)', 'sensei-lms' ),
			icon: quizIcon,
			onClick: () => addNewQuestionBlock( categoryQuestionBlock ),
		},
		{
			title: __( 'Existing Question(s)', 'sensei-lms' ),
			icon: quizIcon,
			onClick: openModal,
		},
	];

	const text = __( 'Add new or existing question(s)', 'sensei-lms' );

	return <TextAppender controls={ controls } text={ text } label={ text } />;
};

export default QuizAppender;
