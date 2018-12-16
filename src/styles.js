import {
    html
} from '@polymer/lit-element';

export const styles = html `
    <style>
        :host{
            inline-size: 100%;
            block-size: 100%;
            display: block;
            overflow: hidden;
        }

        picture {
            display: block;
            inline-size: inherit;
            block-size: inherit;
        }

        picture.loading {
            animation-duration: 1s;
            animation-fill-mode: forwards;
            animation-iteration-count: infinite;
            animation-name: placeHolderShimmer;
            animation-timing-function: linear;
            background: #f6f7f8;
            background: linear-gradient(to right, #eeeeee 8%, #dddddd 18%, #eeeeee 33%);
            background-size: 800px 104px;
        }

        img {
            inline-size: 100%;
            block-size: 100%;
            object-fit: cover;
            transition: opacity .35s ease-in;
        }

        picture.loading > img {
            opacity: 0;
        }

        @keyframes placeHolderShimmer {
            0% {
                background-position: -468px 0
            }
            100% {
                background-position: 468px 0
            }
        }
    </style>
`;