import { animate, animation, style } from "@angular/animations";

export const slideAndFadeAnimation = animation([
    style({
        transform: 'translate(-100%)',
        opacity:0,
        'background-color': '{{startColor}}',
      }),
      animate('{{ time }} ease-out', style ({
        transform: 'translate(-0%)',
        opacity:1,
        'background-color': 'white',
      })),
]);
