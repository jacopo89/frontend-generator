var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import Carousel from "react-material-ui-carousel";
const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
});
const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose } = props, other = __rest(props, ["children", "classes", "onClose"]);
    return (_jsxs(MuiDialogTitle, Object.assign({ disableTypography: true, className: classes.root }, other, { children: [_jsx(Typography, Object.assign({ variant: "h6" }, { children: children }), void 0), onClose ? (_jsx(IconButton, Object.assign({ "aria-label": "close", className: classes.closeButton, onClick: onClose }, { children: _jsx(CloseIcon, {}, void 0) }), void 0)) : null] }), void 0));
});
const DialogContent = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);
const DialogActions = withStyles((theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
    },
}))(MuiDialogActions);
export default function ImageDialog({ open, setOpen, selectedImageIndex, images }) {
    const handleClose = () => {
        setOpen(false);
    };
    return (_jsx("div", { children: _jsxs(Dialog, Object.assign({ onClose: handleClose, "aria-labelledby": "customized-dialog-title", open: open }, { children: [_jsx(DialogTitle, Object.assign({ id: "customized-dialog-title", onClose: handleClose }, { children: selectedImageIndex !== undefined && images[selectedImageIndex]["url"] }), void 0), _jsx(DialogContent, Object.assign({ dividers: true }, { children: _jsx(Carousel, Object.assign({ index: selectedImageIndex }, { children: images.map((item, i) => {
                            const { url } = item;
                            return _jsx("img", { width: "100%", alt: url, src: url }, i);
                        }) }), void 0) }), void 0), _jsx(DialogActions, {}, void 0)] }), void 0) }, void 0));
}
