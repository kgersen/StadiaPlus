export class Language {
    name: string;
    data: LanguageData = {};
    
    constructor(name: string, data: any) {
        this.data = data;
    }

    register(): void {
        Language.languages.push(this);
    }

    get(name: string, vars?: {[key: string]: any}): string {
        let val = this.data[name];
        if(vars !== undefined) {
            for(const _var in vars) {
                val = val.split('{{' + _var + '}}').join(vars[_var]);
            }
        }

        return val;
    }

    setDefault() {
        Language.default = this;
    }

    static languages: Language[] = [];
    static default: Language;
    static current: Language;
    static init(): void {
        this.current = this.default;
        this.languages.forEach((lang) => {
            if(lang.name === window.navigator.language) {
                this.current = lang;
            }
        });
    }

    static get(name: string, vars?: {[key: string]: any}): string {
        let val = this.current.get(name, vars);

        return val;
    }
}

interface LanguageData {
    [key: string]: string;
}