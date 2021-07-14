import styled from 'styled-components'
import ClampLines from 'react-clamp-lines'
import closeIconSrc from '../../../assets/close.svg'
import starIconSrc from '../../../assets/star.svg'

export function Card () {
  const Card = styled.div`
    display: grid;
    grid-template-columns: 20% 1fr 10%;
    grid-template-rows: 10% 20% 1fr 10%;
    height: 250px;
    width: 500px;
    border-top: 1px solid gray;
    padding: 1em;

    > .logo {
      grid-column: 1;
      grid-row: 1/4;

      > img {
        height: 5rem;
        width: 5rem;
        border-radius:50%;
        object-fit: cover;
      }
    }

    > .title {
      grid-column: 2;
      grid-row: 2;
      color: #0366d6;
    }

    > .description {
      grid-column: 2;
      grid-row: 3;
      
      > div { // <ClampLines />
        color: gray;
        font-weight: 300;
        line-height: 1.3em;
      }
    }

    > .stats {
      grid-column: 2;
      grid-row: 4;
      display: flex;
      overflow:hidden;

      > li {
        height: 100%;
        display:flex;
        align-items:center;
        margin-right: 1.5em;
        font-size: 14px;
        color: gray;

        > img {
          height: 100%;
          margin-right: .2em;
          padding: .2em;
        }
      }
    }
    
    > .close-btn {
      grid-column: 3;
      grid-row: 1;
      height: 100%;
      justify-self: right;
      cursor: pointer;
    }
  `

  const descriptionText = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores, id repudiandae et neque obcaecati voluptatibus unde deserunt possimus corporis tempore? Quam fugit alias repudiandae, tempore beatae eos atque praesentium ut eligendi at itaque, aliquid vero. Iusto illo odit, laborum similique nobis repudiandae accusamus, ex explicabo sit fugiat tempora quae, odio cupiditate dolores optio aperiam soluta! Fugiat deserunt sunt obcaecati, quasi eos accusantium molestias, suscipit blanditiis aut ab maxime. Error quod enim pariatur eum quae repellendus voluptatem illum itaque repudiandae aperiam! Natus ut cum, ipsam asperiores dolore accusamus aut, officiis voluptates alias repellat perspiciatis! Maxime nostrum animi deserunt earum voluptatibus eveniet.'

  return (
    <Card>
      <img src={closeIconSrc} alt='close icon' className='close-btn' />
      <div className='logo'>
        <img src='https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg' alt='' />
      </div>
      <h6 className='title'>facebook/<b>react</b></h6>
      <ClampLines text={descriptionText} lines={5} buttons={false} className='description' />
      <ul className='stats'>
        <li><img src={starIconSrc} alt='star icon' />{500}</li>
        <li>{1} issue</li>
        <li>updated {16} days ago</li>
      </ul>
    </Card>
  )
}
