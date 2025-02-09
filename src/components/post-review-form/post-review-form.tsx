import {Fragment} from 'react';
import { useState, ChangeEvent,FormEvent } from 'react';

type PostReviewFormProps = {
  onCommentPost: (rating: number, text: string) => void;
}

function PostReviewForm({onCommentPost}: PostReviewFormProps): JSX.Element {

  const [selectedRating, setSelectedRating] = useState(0);
  const [textReview, setTextReview] = useState('');
  const isValid = textReview.length >= 50 && textReview.length <= 150 && selectedRating !== 0;

  const handleTextAreaChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setTextReview(event.target.value);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value !== undefined){
      setSelectedRating(parseInt(event.target.value, 10));
    }
  };

  return (
    <form
      className="reviews__form form"
      onSubmit={(evt: FormEvent<HTMLFormElement>) => {
        evt.preventDefault();
        onCommentPost(selectedRating, textReview);
      }}
    >
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {[5,4,3,2,1].map((number) => (
          <Fragment key={number}>
            <input
              className="form__rating-input visually-hidden"
              name="rating"
              value={number}
              id={`${number}-stars`}
              type="radio"
              checked={number === selectedRating}
              onChange={handleInputChange}
            />
            <label htmlFor={`${number}-stars`} className="reviews__rating-label form__rating-label" title="perfect">
              <svg className="form__star-image" width="37" height="33">
                <use xlinkHref="#icon-star"></use>
              </svg>
            </label>
          </Fragment>
        ))}

      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review" name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={textReview}
        onChange={handleTextAreaChange}
      >

      </textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
      To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled={!isValid}>Submit</button>
      </div>
    </form>
  );
}

export default PostReviewForm;
